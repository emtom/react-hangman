import { FC } from 'react';
import { HiddenWord } from '../HangmanGame';

interface HiddenWordCharsProps {
  hiddenWord: HiddenWord | undefined;
  correctLetters: string[];
}

export const HiddenWordChars: FC<HiddenWordCharsProps> = ({ hiddenWord, correctLetters }) => {
  return (
    <div className='flex flex-row justify-center mt-8'>
    { hiddenWord?.word.split('').map((letter, i) => (
      <div key={i} className='mx-2 rounded flex items-center justify-center w-8 h-10 text-lg bg-slate-800/25 text-white border-solid border border-sky-900'>
        { correctLetters.includes(letter) 
          ?letter
          : ' '
        }
      </div>
    ))}
  </div>
  )
}