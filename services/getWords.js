import words from './words.js';
const wordList = words.split('\n');

const getWords = (num) => {
  const res = [];
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];
    res.push(randomWord);
  }
  return res;
};

export default getWords;
