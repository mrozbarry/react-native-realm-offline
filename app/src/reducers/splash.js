const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_APPLICATION_COMPLETE':
      return true;

    default:
      return state;
  }
}
