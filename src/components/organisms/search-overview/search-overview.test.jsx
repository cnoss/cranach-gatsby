
import React from 'react';
import { render } from '@testing-library/react';

import SearchOverview from '.';

describe('Organisms/SearchOverview', () => {
  /* Element selectors */
  const searchOverviewSelector = '[data-component="organisms/search-overview"]';

  it('renders correctly', () => {
    const { container } = render(
      <SearchOverview />,
    );

    expect(!!container.querySelector(searchOverviewSelector)).toBe(true);
  });
});
