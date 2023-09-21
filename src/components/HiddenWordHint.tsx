import { FC } from "react";
import { HiddenWord } from "../HangmanGame";

interface HiddenWordHintProps {
  hiddenWord: HiddenWord;
}

export const HiddenWordHint: FC<HiddenWordHintProps> = ({ hiddenWord }) => (
  <div className="flex justify-center mt-2 text-xs text-slate-600">
    { hiddenWord?.hint }
  </div>
)
