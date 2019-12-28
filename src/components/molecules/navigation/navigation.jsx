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
      className="main-navigation"
      role="navigation"
      aria-label="main navigation"
      data-component="molecules/navigation"
    >

      <Link
        className="logo"
        to="/"
      >
        <Logo />
      </Link>

      <ul className="menu">

        <li><i class="material-icons"></i></li>
        {
          navStructure.map(item => (
            <li class="menu-item"
              key={item.to}

            ><Link
              to={ item.to }
              key={ item.to }
              activeClassName="is-active"
              partiallyActive={ true }
            >
              { item.title }
            </Link></li>
          ))
        }
      </ul>

    </nav>
  );
};
