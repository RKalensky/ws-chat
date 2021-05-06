import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import fetchChatRooms from './store/actions/chatRoomsList';

import ChatRoomList from './view/ChatRoomList';
import ChatRoom from './view/ChatRoom';
import NotFound from './view/404';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatRooms());
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/chat-room/:id" component={ChatRoom} />
      <Route path="/" exact component={ChatRoomList} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default App;
