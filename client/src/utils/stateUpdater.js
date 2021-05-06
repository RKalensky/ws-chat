export default (state, updateState, { type, payload }) => {
  const updateStateHandler = updateState(state)[type];
  return updateStateHandler ? updateStateHandler(payload) : state;
};
