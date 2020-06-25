
import React from 'react';
import { render } from '@testing-library/react';

import InvolvedPersonsTable from '.';

describe('Molecules/InvolvedPersonsTable', () => {
  /* Element selectors */
  const involvedPersonsTableSelector = '[data-component="molecules/involved-persons-table"]';

  it('renders correctly', () => {
    const { container } = render(
      <InvolvedPersonsTable />,
    );

    expect(!!container.querySelector(involvedPersonsTableSelector)).toBe(true);
  });
});
