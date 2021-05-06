import React from 'react';

import './index.scss';

export default ({
  nickName,
  message,
  date,
}) => {
  const localDate = new Date(date).toLocaleString(navigator.language);

  return (
    <div className="chat-message-block">
      <div className="chat-message-block--inline-block">
        <h2 className="chat-message-block__nick">{ nickName }</h2>
        <p className="chat-message-block__message">{ message }</p>
        <p className="chat-message-block__date">{ localDate }</p>
      </div>
    </div>
  );
};
