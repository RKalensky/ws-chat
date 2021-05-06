import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useWebSocket, { WS_OPEN_STATUS, WS_CLOSE_STATUS, WS_ERROR_STATUS } from 'hooks/useWebSocket';
import useConnectionChecker from 'hooks/useConnectionChecker';
import useComponentDidUpdate from 'hooks/useComponentDidUpdate';

import { fetchChatMessages } from 'store/actions/chatRoomMessages';
import getChatMessages from 'selectors/getChatMessages';

import Input from 'components/formConstrols/Input';
import Button from 'components/formConstrols/Button';
import ChatMessagePanel from 'components/ChatMessagePanel';
import ChatMessage from 'components/ChatMessage';
import ListMapper from 'components/ListMapper';
import GoHome from 'components/GoHome';
import SyncLoader from 'react-spinners/SyncLoader';

import './index.scss';

const EMPTY_NICK_ERROR_MESSAGE = 'Nickname can\'t be empty';
const EMPTY_MESSAGE_ERROR_MESSAGE = 'Message can\'t be empty';

export default () => {
  const [nick, setNick] = useState('');
  const [nickErrorMessage, setNickErrorMessage] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessageErrorMessage, setChatMessageErrorMessage] = useState('');
  const { id: chatRoomName } = useParams();
  const dispatch = useDispatch();
  const { list: messagesList, errorMessage } = useSelector(getChatMessages);
  const [sendMessage, WSConnectionStatus] = useWebSocket(chatRoomName);
  const isClientOnline = useConnectionChecker();
  const chatRoomElement = useRef();

  useEffect(() => {
    dispatch(fetchChatMessages(chatRoomName));
  }, [chatRoomName, dispatch]);

  useComponentDidUpdate(() => {
    if (isClientOnline) {
      const lastMessageIndex = messagesList.length - 1;
      const { date } = messagesList[lastMessageIndex] || {};
      if (date) {
        dispatch(fetchChatMessages(chatRoomName, date));
      }
    }
  }, [isClientOnline, chatRoomName, dispatch]);

  const nickChangeHandler = useCallback(({ target: { value } }) => {
    setNick(value);
    setNickErrorMessage('');
  }, [setNick]);

  const chatMessageChangeHandler = useCallback(({ target: { value } }) => {
    setChatMessage(value);
    setChatMessageErrorMessage('');
  }, [setChatMessage]);

  const validateForm = useCallback(() => {
    setNickErrorMessage(nick ? '' : EMPTY_NICK_ERROR_MESSAGE);
    setChatMessageErrorMessage(chatMessage ? '' : EMPTY_MESSAGE_ERROR_MESSAGE);

    return nick && chatMessage;
  }, [nick, chatMessage]);

  const sendMessageHandler = useCallback(() => {
    if (validateForm()) {
      sendMessage({ nick, chatMessage });
      setNick('');
      setChatMessage('');
    }
  }, [validateForm, sendMessage, nick, chatMessage]);

  useEffect(() => {
    if (chatRoomElement.current) {
      chatRoomElement.current.scrollTop = chatRoomElement.current.scrollHeight;
    }
  }, [messagesList]);

  const messagesListMapper = ({
    id,
    nick: nickName,
    chatMessage: message,
    date,
  }) => (
    <ChatMessage key={id} nickName={nickName} message={message} date={date} />
  );

  const shouldRender = WSConnectionStatus && !errorMessage;

  return (
    <div className="chat-room-wrapper">
      <GoHome classNames="nav__home-button--position-right" />
      { shouldRender && (
        WSConnectionStatus === WS_ERROR_STATUS
          ? <p className="chat-room__status">Can&apos;t connect to the server</p>
          : (
            <div className="chat-room" ref={chatRoomElement}>
              <ListMapper collection={messagesList} mapperCb={messagesListMapper} fallbackMessage="No messages" />
              {
                WSConnectionStatus === WS_CLOSE_STATUS
                  && (
                    <p className="chat-room__status chat-room__status--server-connection-lost">
                      Connection is lost due to server problems. Reconnecting...
                    </p>
                  )
              }
              <ChatMessagePanel
                disabled={WSConnectionStatus !== WS_OPEN_STATUS}
                nickNameInput={(
                  <Input
                    classNames="chat-message-panel__input"
                    value={nick}
                    placeholder="Nickname"
                    changeHandler={nickChangeHandler}
                    errorMessage={nickErrorMessage}
                  />
                )}
                messageInput={(
                  <Input
                    classNames="chat-message-panel__input"
                    value={chatMessage}
                    placeholder="Message"
                    changeHandler={chatMessageChangeHandler}
                    errorMessage={chatMessageErrorMessage}
                  />
                )}
                sendButton={<Button classNames="chat-message-panel__submit-button submit-button--theme-blue" clickHandler={sendMessageHandler} />}
              />
              {(
                !isClientOnline && (
                  <p className="chat-room__status chat-room__status--client-connection-lost">
                    client is offline, connecting...
                  </p>
                )
              )}
            </div>
          )
      ) }
      { !WSConnectionStatus && <div className="chat-room__loader loader"><SyncLoader color="#7f7f7f" /></div> }
      { errorMessage && <p className="chat-room__status chat-room__status--not-found">{ errorMessage }</p> }
    </div>
  );
};
