const initialState = 'http://localhost:8080';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'API_HOST_SET':
      return action.apiHost;

    default:
      return state;
  }
}
