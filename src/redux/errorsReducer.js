const initialState = {
  ticketsError: false,
  moreTicketsError: false,
  searchIdError: false,
};

const errorsReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (true) {
    case action.type === 'SET_TICKETS_ERROR':
      newState.ticketsError = true;
      return newState;

    case action.type === 'SET_SEARCH_ID_ERROR':
      newState.searchIdError = true;
      return newState;

    case action.type === 'GET_REST_TICKETS_ERROR':
      newState.moreTicketsError = true;
      return newState;

    default:
      return state;
  }
};

export default errorsReducer;
