import React from 'react';
import combineClassNames from 'utils/combineClassNames';

import './index.scss';

export default ({ classNames, type = 'submit', clickHandler }) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    // todo: check re-render, probably useMemo usage is needed
    className={combineClassNames(classNames, 'submit-button')}
    onClick={(event) => { event.preventDefault(); clickHandler(event); }}
  >
    Send
  </button>
);
