import fetchData from '../../services/fetchData';
import {
  FETCH_CHATROOM_MESSAGES_START,
  FETCH_CHATROOM_MESSAGES_ERROR,
  FETCH_CHATROOM_MESSAGES_SUCCESS,
  SEND_MESSAGE_ERROR,
  ADD_MESSAGE,
} from './actionTypes';

const fetchChatMessagesStart = () => ({
  type: FETCH_CHATROOM_MESSAGES_START,
});

const fetchChatMessagesError = (payload) => ({
  type: FETCH_CHATROOM_MESSAGES_ERROR,
  payload,
});

const fetchChatMessagesSuccess = (payload) => ({
  type: FETCH_CHATROOM_MESSAGES_SUCCESS,
  payload,
});

const sendMessageError = (payload) => ({
  type: SEND_MESSAGE_ERROR,
  payload,
});

export const addWSMessage = (payload) => ({
  type: ADD_MESSAGE,
  payload,
});

export const sendWSMessage = ({ wsConnection, roomName, messageBody }) => (dispatch) => {
  try {
    wsConnection.send(JSON.stringify({ roomName, messageBody }));
  } catch (error) {
    dispatch(sendMessageError(error));
  }
};

export const fetchChatMessages = (id, date) => async (dispatch) => {
  try {
    dispatch(fetchChatMessagesStart());
    const { data: { chatMessages } } = await fetchData(`/api/chat-room/${id}`, { date });
    dispatch(fetchChatMessagesSuccess(chatMessages));
  } catch (error) {
    dispatch(fetchChatMessagesError(error.response ? error.response.data.message : 'Can\'t connect to the server'));
  }
};
