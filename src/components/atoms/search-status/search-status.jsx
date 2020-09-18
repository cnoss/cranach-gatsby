import React from 'react';
import { useTranslation } from '~/i18n';

import translations from './translations.json';
import './search-status.scss';

export default ({ status = { paintings: 0, graphics: 0, archivals: 0 } }) => {
  const { t } = useTranslation('SearchStatus', translations);

  const {
    paintings = 0,
    graphics = 0,
    archivals = 0,
  } = status;

  return (
    <div
      className="search-status"
      data-component="atoms/search-status"
    >
      <i className="material-icons">insert_photo</i>
      <span>
        <span> { paintings } <span className="entity-names">{ t('paintings') }</span></span>,
        <span> { graphics } <span className="entity-names">{ t('graphics') }</span></span> { t('and') }
        <span> { archivals } <span className="entity-names">{ t('archivals') }</span></span> { t('found') }
      </span>
    </div>
  );
};
