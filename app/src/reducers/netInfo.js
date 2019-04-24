const initialState = 'undetermined';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NETINFO_CHANGE':
      return action.isConnected ? 'connected' : 'disconnected';

    default:
      return state;
  }
}
