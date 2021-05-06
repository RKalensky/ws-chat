import React from 'react';
import combineClassNames from 'utils/combineClassNames';

import './index.scss';

export default ({
  classNames,
  type = 'text',
  value = '',
  placeholder = '',
  errorMessage = '',
  changeHandler,
}) => (
  // todo: check re-render, probably useMemo usage is needed
  <div className={combineClassNames(classNames, 'form-input-wrapper')}>
    <input
      className={combineClassNames('form-input', (errorMessage ? 'form-input--has-error' : ''))}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={changeHandler}
    />
    <p className="form-input__error-message">{ errorMessage }</p>
  </div>
);
