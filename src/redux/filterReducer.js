const initialState = {
  checkAll: true,
  check0: true,
  check1: true,
  check2: true,
  check3: true,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (true) {
    case action.type === 'ALL' && newState.checkAll:
      for (const key in newState) {
        if (key) {
          newState[key] = false;
        }
      }
      // newState.filter.checkAll = false
      return newState;

    case action.type === 'ALL':
      for (const key in newState) {
        if (key) {
          newState[key] = true;
        }
      }
      return newState;

    case action.type === 'NONE':
      newState.checkAll = false;
      newState.check0 = !newState.check0;
      return newState;

    case action.type === 'ONE':
      newState.checkAll = false;
      newState.check1 = !newState.check1;
      return newState;

    case action.type === 'TWO':
      newState.checkAll = false;
      newState.check2 = !newState.check2;
      return newState;

    case action.type === 'THREE':
      newState.checkAll = false;
      newState.check3 = !newState.check3;
      return newState;

    default:
      return state;
  }
};

export default reducer;
