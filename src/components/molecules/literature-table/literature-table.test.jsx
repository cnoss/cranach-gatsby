
import React from 'react';
import { render } from '@testing-library/react';

import LiteratureTable from '.';

describe('Molecules/LiteratureTable', () => {
  /* Element selectors */
  const literatureTableSelector = '[data-component="molecules/literature-table"]';

  it('renders correctly', () => {
    const { container } = render(
      <LiteratureTable />,
    );

    expect(!!container.querySelector(literatureTableSelector)).toBe(true);
  });
});
