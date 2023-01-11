import words from './words.js';

const getWords = (num) => {
  const wordList = words.split('\n');
  const res = [];
  for (let i = 0; i < num; i++) {
    // Get random index
    const randomIndex = Math.floor(Math.random() * wordList.length);
    // Get random word
    const randomWord = wordList[randomIndex];
    // Add to result
    res.push(randomWord);
  }
  return res;
};

export default getWords;
