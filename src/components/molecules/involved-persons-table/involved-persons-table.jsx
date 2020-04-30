import React from 'react';

import DynamicTable from '~/components/atoms/dynamic-table';
import './involved-persons-table.scss';

export default ({
  data,
  className = '',
}) => (
  <div
    className={ `involved-persons-table ${className}` }
    data-component="molecules/involved-persons-table"
  >
    <DynamicTable
      data={ data }
      columns={ [
        { field: 'role' },
        { field: 'name' },
        { field: 'remarks' },
      ] }
    />
  </div>
);
