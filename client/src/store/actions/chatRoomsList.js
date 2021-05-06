import fetchData from '../../services/fetchData';
import { FETCH_CHATROOMS_START, FETCH_CHATROOMS_ERROR, FETCH_CHATROOMS_SUCCESS } from './actionTypes';

const fetchChatRoomsStart = () => ({
  type: FETCH_CHATROOMS_START,
});

const fetchChatRoomsError = (payload) => ({
  type: FETCH_CHATROOMS_ERROR,
  payload,
});

const fetchChatRoomsSuccess = (payload) => ({
  type: FETCH_CHATROOMS_SUCCESS,
  payload,
});

export default function fetchChatRooms() {
  return async (dispatch) => {
    try {
      dispatch(fetchChatRoomsStart());
      const { data: { chatRooms } } = await fetchData('/api/chat-rooms');
      dispatch(fetchChatRoomsSuccess(chatRooms));
    } catch (error) {
      dispatch(fetchChatRoomsError(error));
    }
  };
}
