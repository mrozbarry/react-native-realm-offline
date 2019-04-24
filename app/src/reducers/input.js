const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return action.text;

    case 'MESSAGE_SUBMIT':
      return initialState;

    default:
      return state;
  }
};
