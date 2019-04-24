const initialState = `user_${Math.random().toString(36).slice(2, 7)}`;

export default (state = initialState) => state;
