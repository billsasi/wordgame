const handleKeyUp = (state, action) => {
  const { players } = state;
  const [player1, ...restOfPlayers] = players;
  const entered = players[0].currentWord;
  for (let i = 1; i < players.length; i++) {
    for (let j = 0; j < players[i].words.length; j++) {
      if (players[i].words[j] === entered) {
        players[0].currentWord = '';
        const victimIndex = players[i].words.indexOf(entered);
        players[i].words.splice(victimIndex, 1);
        players[0].words.push(entered);
        return {
          ...state,
          players: [...players],
        };
      }
    }
  }
  return {
    ...state,
    players: [{ ...player1, wordEntryError: true }, ...restOfPlayers],
  };
};

const handleInputChange = (state, action) => {
  const newWord = action.payload;
  const [player1, ...restOfPlayers] = state.players;
  return {
    ...state,
    players: [
      { ...player1, currentWord: newWord, wordEntryError: false },
      ...restOfPlayers,
    ],
  };
};

export const playReducer = (state = {}, action, initData) => {
  console.log(action, state);

  switch (action.type) {
    case 'KEY_UP':
      return handleKeyUp(state, action);

    case 'INPUT_CHANGE':
      return handleInputChange(state, action);
    default:
      return state;
  }
};
