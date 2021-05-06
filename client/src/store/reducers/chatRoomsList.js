import stateUpdater from 'utils/stateUpdater';
import { FETCH_CHATROOMS_START, FETCH_CHATROOMS_ERROR, FETCH_CHATROOMS_SUCCESS } from '../actions/actionTypes';

const initialState = {
  fetched: false,
  list: [],
  isLoading: false,
  errorMessage: '',
};

const updateState = (state) => ({
  [FETCH_CHATROOMS_START]: () => ({ ...state, isLoading: true, errorMessage: '' }),
  [FETCH_CHATROOMS_ERROR]: ({ message }) => ({ ...state, errorMessage: message, isLoading: false }),
  [FETCH_CHATROOMS_SUCCESS]: (payload) => ({
    ...state,
    fetched: true,
    errorMessage: '',
    list: payload,
    isLoading: false,
  }),
});

export default (state = initialState, { type, payload }) => (
  stateUpdater(state, updateState, { type, payload })
);
