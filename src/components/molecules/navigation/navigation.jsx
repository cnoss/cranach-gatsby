import React, { Fragment } from 'react';
import { withPrefix } from 'gatsby';
import { useTranslation } from '~/i18n';

import Logo from '~/components/atoms/logo';
import Link from '~/components/atoms/link';

import translations from './translations.json';
import './navigation.scss';

export default ({
  goBackTo,
}) => {
  const { t } = useTranslation('Navigation', translations);

  /* TODO: Pass through as parameter (?) */
  const baseNavStructure = [
    {
      code: 'Graphics',
      to: '/',
    },
    {
      code: 'Paintings',
      to: 'http://lucascranach.org/gallery',
    },
    {
      code: 'Archival Documents',
      to: 'http://lucascranach.org/archival-documents',
    },
    {
      code: 'Literature',
      to: 'http://lucascranach.org/publications',
    },
  ];

  const navStructure = baseNavStructure.map(item => ({
    ...item,
    title: t(item.code),
  }));

  const goBackContent = (
    <Link
      className="reverse-navigation"
      to={goBackTo}
      triggersInternalTransition={ true }
      internalTransitionDirection='right'
    >
      <i className="material-icons">arrow_back_ios</i>
      <span>{t('back to the overview')}</span>
    </Link>
  );

  const defaultContent = (
    <Fragment>
      <Link className="logo" to="/"><Logo /></Link>

      <ul className="menu">
        <li><i className="material-icons" /></li>
        {
          navStructure.map(item => (
            <li className="menu-item"
                key={item.to}

            ><Link
              to={item.to}
              key={item.to}
              activeClassName="is-active"
              partiallyActive={true}
            >
              {item.title}
            </Link></li>
          ))
        }
      </ul>
      <ul className="lang-switcher">
        <li className="lang-switcher-item">
          <a href={withPrefix('/de')}>DE</a>
        </li>
        <li className="lang-switcher-item">
          <a href={withPrefix('/en')}>EN</a>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <nav
      className="main-navigation"
      role="navigation"
      aria-label="main navigation"
      data-component="molecules/navigation"
    >
      {
        goBackTo
          ? goBackContent
          : defaultContent
      }

    </nav>
  );
};
