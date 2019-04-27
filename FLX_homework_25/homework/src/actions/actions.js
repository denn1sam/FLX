const SHOW_MORE = 'SHOW_MORE';
const REMOVE_USER = 'REMOVE_USER';
const FILTER = 'FILTER';

function addAction(type, value) {
  return {
    type: type,
    value: value
  };
}

export {
    SHOW_MORE,
    REMOVE_USER,
    FILTER,
    addAction
};
