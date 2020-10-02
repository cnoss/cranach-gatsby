
import React from 'react';
import { render } from '@testing-library/react';

import SearchBar from '.';

describe('Organisms/SearchBar', () => {
  /* Element selectors */
  const searchBarSelector = '[data-component="organisms/search-bar"]';

  it('renders correctly', () => {
    const { container } = render(
      <SearchBar />,
    );

    expect(!!container.querySelector(searchBarSelector)).toBe(true);
  });
});
