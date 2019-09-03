import React from 'react';
import { Link } from 'gatsby';

import Logo from '~/components/atoms/logo';

export default () => (
  <nav
    className="navigation navbar has-shadow is-spaced"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <Link
        className="navbar-item"
        to="/"
      >
        <Logo />
      </Link>
    </div>

    <div className="navbar-menu"></div>
  </nav>
);
