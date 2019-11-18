import React from 'react';

import Logo from '~/components/atoms/logo';
import Link from '~/components/atoms/link';

import './navigation.scss';

export default () => {
  /* TODO: Pass through as parameter (?) */
  const navStructure = [
    {
      title: 'Grafiken',
      to: '/',
    },
    {
      title: 'Gemälde',
      to: 'http://lucascranach.org/gallery',
    },
    {
      title: 'Archivalien',
      to: 'http://lucascranach.org/archival-documents',
    },
    {
      title: 'Literatur',
      to: 'http://lucascranach.org/publications',
    },
  ];

  return (
    <nav
      className="navigation navbar"
      role="navigation"
      aria-label="main navigation"
      data-component="molecules/navigation"
    >
      <div className="navbar-brand">
        <Link
          className="navbar-item"
          to="/"
        >
          <Logo />
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          {
            navStructure.map(item => (
              <Link
                className="navbar-item is-tab"
                to={ item.to }
                key={ item.to }
                activeClassName="is-active"
                partiallyActive={ true }
              >
                { item.title }
              </Link>
            ))
          }
        </div>

        <div className="navbar-end">
        </div>
      </div>
    </nav>
  );
};
