import { FETCH_EVENTS, FETCH_EVENT } from '../actions/types';

export default function(state = {}, action) {
  let initialState = {
    ...state,
    index: []
  };
  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state, index: action.payload };
    case FETCH_EVENT:
      return { ...initialState, eventInitialValues: action.payload };
    default:
      return initialState;
  }
}
