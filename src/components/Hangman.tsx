import { FC } from 'react';

interface HangmanProps {
  steps: number;
}

export const Hangman: FC<HangmanProps> = ({ steps }) => {
  return (
    <div className='mx-auto flex items-center justify-center w-[160px] h-[160px] rounded-xl overflow-hidden bg-slate-800/25'>
      { steps > 0 && <svg width="75" height="142" viewBox="0 0 75 142" fill="none" xmlns="http://www.w3.org/2000/svg">
      { steps >= 1 && <line  x1="2" y1="142" x2="2" stroke="#ffffff" strokeWidth="4"/> }
      { steps >= 2 && <line x1="4" y1="2" x2="61" y2="2" stroke="#ffffff" strokeWidth="4"/> }
      { steps >= 3 && <line x1="60" x2="60" y2="21" stroke="#ffffff" strokeWidth="4"/> }
      { steps >= 4 && <circle cx="61" cy="35" r="12" stroke="#ffffff" strokeWidth="4"/> }
      { steps >= 5 && <line x1="60" y1="45" x2="60" y2="74" stroke="#ffffff" strokeWidth="4"/> }
      { steps >= 6 && <line x1="50.0899" y1="77.4072" x2="59.0899" y2="48.4072" stroke="#ffffff" strokeWidth="4"/> }
      { steps >= 6 && <line x1="61.857" y1="48.2572" x2="71.857" y2="73.2572" stroke="#ffffff" strokeWidth="4"/> }
      { steps >= 7 && <line y1="-2" x2="32.0288" y2="-2" transform="matrix(0.251418 -0.967879 0.95118 0.308637 54 105)" stroke="#ffffff" strokeWidth="4"/> }
      { steps >= 7 && <line y1="-2" x2="30.6246" y2="-2" transform="matrix(0.321379 0.946951 -0.920684 0.39031 58 74)" stroke="#ffffff" strokeWidth="4"/> }
      </svg> }
    </div>
  )
}