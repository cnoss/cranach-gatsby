import React, { Fragment } from 'react';
import { useTranslation } from '~/i18n';

import Logo from '~/components/atoms/logo';
import Link from '~/components/atoms/link';
import Switcher from '~/components/atoms/switcher';

import translations from './translations.json';
import './navigation.scss';

export default ({
  goBackTo,
  children,
}) => {
  const { t } = useTranslation('Navigation', translations);

  /* TODO: Pass through as parameter (?) */
  const navStructure = [
    {
      title: 'Prints and Drawings',
      to: '/',
    },
    {
      title: 'Paintings',
      to: 'http://lucascranach.org/gallery',
    },
    {
      title: 'Archival Documents',
      to: 'http://lucascranach.org/archival-documents',
    },
    {
      title: 'Literature',
      to: 'http://lucascranach.org/publications',
    },
  ];

  const goBackContent = (
    <Link
      className="reverse-navigation"
      to={goBackTo}
      triggersInternalTransition={ true }
      internalTransitionDirection='right'
    >
      <i className="material-icons">arrow_back_ios</i><span>{t('back to the overview')}</span>
    </Link>
  );

  const defaultContent = (
    <Fragment>
      <Link className="logo" to="/"><Logo /></Link>

      <ul className="menu">
        <li><i className="material-icons" /></li>
        {
          navStructure.map((item) => (
            <li className="menu-item"
                key={item.to}

            ><Link
              to={item.to}
              activeClassName="is-active"
              partiallyActive={true}
            >
              {t(item.title)}
            </Link></li>
          ))
        }
      </ul>

      <div className="right-end">
        { children }

        <Switcher className="lang-switcher">
          <Switcher.Item className="lang-switcher-item">
            <Link activeClassName="is-active" to="/de/">DE</Link>
          </Switcher.Item>
          <Switcher.Item className="lang-switcher-item">
            <Link activeClassName="is-active" to="/en/">EN</Link>
          </Switcher.Item>
        </Switcher>
      </div>
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
