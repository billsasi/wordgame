export const playReducer = (state = {}, action, initData) => {
  const { players } = state;
  const [player1, ...restOfPlayers] = players;
  switch (action.type) {
    case 'KEY_DOWN':
      if (action.payload.event.key === 'Enter') {
        const entered = players[0].currentWord;
        console.log(entered);
        for (let i = 1; i < players.length; i++) {
          console.log(players[i].words[0]);
          if (players[i].words[0] === entered) {
            players[0].currentWord = '';
            players[i].words = players[i].words.slice(1);
            players[0].words.push(entered);
            return {
              ...state,
              players: [...players],
            };
          }
        }
        return {
          ...state,
          players: [player1, ...restOfPlayers],
        };
      }

    case 'INPUT_CHANGE':
      const newWord = action.payload;
      console.log(action.payload);
      return {
        ...state,
        players: [
          { ...player1, currentWord: player1.currentWord },
          ...restOfPlayers,
        ],
      };
    default:
      return state;
  }
};
