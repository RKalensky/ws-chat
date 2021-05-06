import React from 'react';
import { NavLink } from 'react-router-dom';

import combineClassNames from 'utils/combineClassNames';

import './index.scss';

export default ({ classNames }) => (
  <NavLink to="/">
    <p className={combineClassNames(classNames, 'nav__home-button')}>
      Go home
    </p>
  </NavLink>
);
