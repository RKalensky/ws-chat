import { combineReducers } from 'redux';
import chatRoomsList from './chatRoomsList';
import chatRoomMessages from './chatRoomMessages';

export default combineReducers({ chatRoomsList, chatRoomMessages });
