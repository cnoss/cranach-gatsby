
import React from 'react';
import { render } from '@testing-library/react';

import DynamicTable from '.';

describe('Atoms/DynamicTable', () => {
  /* Element selectors */
  const dynamicTableSelector = '[data-component="atoms/dynamic-table"]';

  it('renders correctly', () => {
    const { container } = render(
      <DynamicTable />,
    );

    expect(!!container.querySelector(dynamicTableSelector)).toBe(true);
  });
});
