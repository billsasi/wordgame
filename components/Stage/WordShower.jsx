import { useEffect, useState } from "react";

export default function WordShower(props) {
  const { words, currentWord } = props;

  return (
    <>
      {words.map((word) => {
        return (
          <div
            key={word}
            className="word"
          >
            <Word word={word} currentWord={currentWord} />
          </div>
        );
      })}
    </>
  );
}


const Word = (props) => {
  const { word, currentWord } = props;
  const [y, setY] = useState(0);
  const [x, setX] = useState(window.innerWidth / 2);

  useEffect(() => {
    const interval = setInterval(() => {
      setY((y) => y + 2);
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const highlightLength = 
    (currentWord && word.indexOf(currentWord) === 0) ? currentWord.length: 0;

  return (
    <div style={{ left: x, top: y }} className="word">
      {word.split('').map((char, index) => {
        return (
          <span
            key={index}
            style={{ color: highlightLength <= index ? '#fff' : 'red' }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}