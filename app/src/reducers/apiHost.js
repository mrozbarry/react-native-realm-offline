const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APIHOST_SET':
      return action.value;

    default:
      return state;
  }
}
