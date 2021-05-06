import {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import getAPIUrl from 'services/getAPIUrl';

import { sendWSMessage, addWSMessage } from 'store/actions/chatRoomMessages';

export const WS_OPEN_STATUS = 'open';
export const WS_CLOSE_STATUS = 'close';
export const WS_ERROR_STATUS = 'error';

const RECONECT_COUNT = 5;
const RECCONET_INTERVAL = 5000;

export default (roomName) => {
  const dispatch = useDispatch();
  const [wsConnection, setWsConnection] = useState(null);
  const [WSConnectionStatus, setWSConnectionStatus] = useState(null);

  const sendMessage = useCallback((messageBody) => {
    dispatch(sendWSMessage({ wsConnection, roomName, messageBody }));
  }, [dispatch, wsConnection, roomName]);

  const connect = useCallback(() => {
    try {
      const connection = new WebSocket(getAPIUrl().replace('http', 'ws'));
      setWsConnection(connection);
    } catch (err) {
      setWSConnectionStatus(WS_ERROR_STATUS);
    }
  }, [setWSConnectionStatus, setWsConnection]);

  const openHandler = useCallback(() => {
    setWSConnectionStatus(WS_OPEN_STATUS);
  }, [setWSConnectionStatus]);

  const closeHandler = useCallback(() => {
    const status = wsConnection.hasError ? WS_ERROR_STATUS : WS_CLOSE_STATUS;
    setWSConnectionStatus(status);
  }, [wsConnection, setWSConnectionStatus]);

  const errorHandler = useCallback(() => {
    if (WSConnectionStatus !== WS_CLOSE_STATUS) {
      setWSConnectionStatus(WS_ERROR_STATUS);
      wsConnection.hasError = true;
    }
  }, [WSConnectionStatus, wsConnection, setWSConnectionStatus]);

  const messageHandler = useCallback(({ data }) => {
    const { roomName: roomNameFromServer, message } = JSON.parse(data);

    if (roomNameFromServer === roomName) {
      dispatch(addWSMessage(message));
    }
  }, [roomName, dispatch]);

  const shouldRecconect = useCallback(() => (
    WSConnectionStatus && WSConnectionStatus === WS_CLOSE_STATUS
  ), [WSConnectionStatus]);

  useEffect(() => {
    let intervalId = null;

    if (shouldRecconect()) {
      let tryNumber = 0;

      const tick = () => {
        if (tryNumber >= RECONECT_COUNT) {
          setWSConnectionStatus(WS_ERROR_STATUS);
          clearInterval(intervalId);
          return;
        }
        connect();
        tryNumber += 1;
      };

      intervalId = setInterval(tick, RECCONET_INTERVAL);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [WSConnectionStatus, shouldRecconect, connect, setWSConnectionStatus]);

  useEffect(() => {
    if (!wsConnection) {
      connect();
    }

    if (wsConnection) {
      wsConnection.addEventListener('open', openHandler);
      wsConnection.addEventListener('close', closeHandler);
      wsConnection.addEventListener('error', errorHandler);
      wsConnection.addEventListener('message', messageHandler);
    }

    return () => {
      if (wsConnection) {
        wsConnection.removeEventListener('open', openHandler);
        wsConnection.removeEventListener('close', closeHandler);
        wsConnection.removeEventListener('error', errorHandler);
        wsConnection.removeEventListener('message', messageHandler);
      }
    };
  }, [
    wsConnection,
    connect,
    openHandler,
    closeHandler,
    errorHandler,
    messageHandler,
  ]);

  return [sendMessage, WSConnectionStatus];
};
