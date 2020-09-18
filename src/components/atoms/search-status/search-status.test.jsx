
import React from 'react';
import { render } from '@testing-library/react';

import SearchStatus from '.';

describe('Atoms/SearchStatus', () => {
  /* Element selectors */
  const searchStatusSelector = '[data-component="atoms/search-status"]';

  it('renders correctly', () => {
    const { container } = render(
      <SearchStatus />,
    );

    expect(!!container.querySelector(searchStatusSelector)).toBe(true);
  });
});
