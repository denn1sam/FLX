const createStore = (reducer) => {
  let _state;
  const _listeners = [];
  const getState = () => {
    return _state;
  };
  const dispatch = (action) => {
    _state = reducer(_state, action);
    _listeners.forEach((cb) => {
      cb(_state);
    });
  };
  const subscribe = (cb) => {
    _listeners.push(cb);
  };
  dispatch();
  return {
    dispatch,
    subscribe,
    getState
  };
};
export { createStore };
