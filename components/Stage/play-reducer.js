
export const playReducer = (state = {}, action, initData) => {
  const { players } = state;
  const [player1, ...restOfPlayers] = players;
  switch (action.type) {
    case 'KEY_UP':
      if (action.payload.event.key === 'Enter') {
        return state;
      }
      if (action.payload.event.key === 'Backspace') {
        return state;
      }
      if (action.payload.event.key != 0) {
        return {
          ...state,
          players: [
            {
              ...player1,
              currentWord: player1.currentWord + action.payload.event.key,
            },
          ]
        };

      }
      return state;

    default:
      return state
  }
}