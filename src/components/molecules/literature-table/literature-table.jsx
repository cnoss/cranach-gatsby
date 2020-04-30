import React from 'react';
import { useTranslation } from '~/i18n';

import DynamicTable from '~/components/atoms/dynamic-table';

import translations from './translations.json';
import './literature-table.scss';

export default ({
  data,
  className = '',
}) => {
  const { t } = useTranslation('LiteratureTable', translations);

  return (
    <div
      className={ `literature-table ${className}` }
      data-component="molecules/literature-table"
    >
      <DynamicTable
        data={ data }
        columns={ [
          { field: 'title', title: '' },
          { field: 'pageNumber', title: t('reference on page') },
        ] }
      />
    </div>
  );
};
