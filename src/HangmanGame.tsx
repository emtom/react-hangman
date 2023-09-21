import { FC, useCallback, useEffect, useState } from "react";
import { Hangman } from "./components/Hangman";
import { HiddenWordChars } from "./components/HiddenWord";
import { HiddenWordHint } from "./components/HiddenWordHint";

export type HiddenWord = {
  langCode: string;
  word: string;
  hint: string;
}

export interface IWordResponse {
  words: HiddenWord[];
}

export enum GAME_STATE {
  INITIAL = 'INITIAL',
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST'
}

const MISTAKES_COUNT = 7;

export const HangmanGame: FC = () => {
  const [availableWords, setAvailableWords] = useState<HiddenWord[]>([]);
  const [hiddenWord, setHiddenWord] = useState<HiddenWord>();
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [missCount, setMissCount] = useState(0);
  const [gameState, setGameState] = useState<GAME_STATE>(GAME_STATE.INITIAL);

  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then((data: IWordResponse) => {
        setAvailableWords(data.words);
        setHiddenWord(data.words[Math.floor(Math.random() * data.words.length)])
        setGameState(GAME_STATE.PLAYING);
      })
  }, []); 

  useEffect(() => {
    const isGameWon = () => hiddenWord?.word.split('').every(letter => correctLetters.includes(letter));

    if (isGameWon()) {
      setGameState(GAME_STATE.WON);
    }
  }, [hiddenWord, correctLetters]);

  useEffect(() => {
    if (missCount >= MISTAKES_COUNT) {
      setGameState(GAME_STATE.LOST);
    }
  }, [missCount]);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      const { key } = event;

      console.log('key', key)

      if (gameState !== GAME_STATE.PLAYING) {
        return;
      }

      if (!key.match(/^[A-Za-z\u00C0-\u02AF\u0391-\u03CE\u0400-\u04FF]$/)) {
        return;
      }

      if (correctLetters.includes(key)) {
        console.info('letter already checked!');
        return;
      }

      if (hiddenWord?.word.includes(key)) {
        setCorrectLetters(prev => [...prev, key]);
      } else {
        setMissCount(prev => ++prev);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [gameState, hiddenWord, correctLetters])

  const hintVisible = hiddenWord
    ? (correctLetters.length <= hiddenWord.word.length / 2) && missCount >= MISTAKES_COUNT / 2
    : false

  const playAgain = useCallback(() => {
    setHiddenWord(availableWords[Math.floor(Math.random() * availableWords.length)])
    setGameState(GAME_STATE.PLAYING);
    setMissCount(0);
    setCorrectLetters([]);
  }, [availableWords]);

  return (
    <div className="h-full antialiased text-slate-200 text-sm bg-slate-900">
      <div className="flex pt-12 flex-col">
        { <Hangman steps={missCount} /> }

        { gameState !== GAME_STATE.INITIAL && <HiddenWordChars hiddenWord={hiddenWord} correctLetters={correctLetters} /> }
        { hintVisible && hiddenWord && <HiddenWordHint hiddenWord={hiddenWord} />}

        { gameState == GAME_STATE.WON && <div className="flex items-center mt-8 flex-col">
          <div className="px-8 py-2 bg-green-800 rounded border-green-600 border">Udało się!</div>
            <button onClick={playAgain} className="font-semibold text-xs mt-2">Zagraj jeszcze raz</button>
          </div>
        }

        { gameState == GAME_STATE.LOST && <div className="flex items-center mt-8 flex-col">
          <div className="px-8 py-2 bg-red-800 rounded border-red-600 border">Nie udało się</div>
            <button onClick={playAgain} className="font-semibold text-xs mt-2">Zagraj jeszcze raz</button>
          </div>
        }
      </div>
    </div>
  )
}