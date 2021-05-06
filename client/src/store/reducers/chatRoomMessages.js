import stateUpdater from 'utils/stateUpdater';
import {
  FETCH_CHATROOM_MESSAGES_START,
  FETCH_CHATROOM_MESSAGES_ERROR,
  FETCH_CHATROOM_MESSAGES_SUCCESS,
  ADD_MESSAGE,
} from '../actions/actionTypes';

const initialState = {
  fetched: false,
  list: [],
  isLoading: false,
  errorMessage: '',
};

const updateState = (state) => ({
  [FETCH_CHATROOM_MESSAGES_START]: () => ({ ...state, isLoading: true, errorMessage: '' }),
  [FETCH_CHATROOM_MESSAGES_ERROR]: (errorMessage) => (
    { ...state, errorMessage, isLoading: false }
  ),
  [FETCH_CHATROOM_MESSAGES_SUCCESS]: (payload) => ({
    ...state,
    fetched: true,
    errorMessage: '',
    list: payload,
    isLoading: false,
  }),
  [ADD_MESSAGE]: (message) => ({ ...state, list: [...state.list, message] }),
});

export default (state = initialState, { type, payload }) => (
  stateUpdater(state, updateState, { type, payload })
);
