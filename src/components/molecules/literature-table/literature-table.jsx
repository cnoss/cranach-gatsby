import React from 'react';
import { useTranslation } from 'react-i18next';

import DynamicTable from '~/components/atoms/dynamic-table';
import './literature-table.scss';

export default ({ data }) => {
  const { t } = useTranslation('LiteratureTable');

  return (
    <div
      className="literature-table"
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
