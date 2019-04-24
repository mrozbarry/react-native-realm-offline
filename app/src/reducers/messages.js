const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "MESSAGES_SET":
      return action.messages;

    default:
      return state;
  }
};
