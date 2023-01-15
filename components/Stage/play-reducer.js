

export const playReducer = (state = {}, action, initData) => {
  console.log(action, state);

  switch (action.type) {
    case 'KEY_UP':
      return handleKeyUp(state, action);
      
    default:
      return state;
  }
};


function handleKeyUp(state, action) {
  const { key } = action;
  console.log('handleKeyUp', action);
  return state;
}
  