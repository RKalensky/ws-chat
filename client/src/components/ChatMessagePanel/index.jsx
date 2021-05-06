import React from 'react';
import combineClassNames from 'utils/combineClassNames';

import './index.scss';

export default ({
  disabled,
  nickNameInput,
  messageInput,
  sendButton,
}) => (
  <form className={combineClassNames('chat-message-panel', [disabled ? 'disabled' : ''])}>
    { nickNameInput }
    { messageInput }
    { sendButton }
  </form>
);
