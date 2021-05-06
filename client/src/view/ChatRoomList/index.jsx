import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';

import getChatRooms from 'selectors/getChatRooms';

import ListMapper from 'components/ListMapper';

import './index.scss';

const ChatRoomList = () => {
  const { list: chatRoomsList, isLoading } = useSelector(getChatRooms);
  const chatRoomsListMapper = (chatPort, index) => (
    <li
      key={index}
      className="list-block__item"
    >
      <NavLink to={`chat-room/${chatPort}`}>{`Chat room with id: ${chatPort}`}</NavLink>
    </li>
  );

  return (
    <div className="chat-main">
      <h1 className="chat-main__header">
        ChatRoomList
      </h1>
      {
        !isLoading
          ? (
            <ul className="chat-main__list-block list-block">
              <ListMapper collection={chatRoomsList} mapperCb={chatRoomsListMapper} fallbackMessage="No chat rooms were found" />
            </ul>
          )
          : <SyncLoader color="#7f7f7f" />
      }
    </div>
  );
};

export default ChatRoomList;
