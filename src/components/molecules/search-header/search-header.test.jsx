
import React from 'react';
import { render } from '@testing-library/react';

import SearchHeader from '.';

describe('Molecules/SearchHeader', () => {
  /* Element selectors */
  const searchHeaderSelector = '[data-component="molecules/search-header"]';

  it('renders correctly', () => {
    const { container } = render(
      <SearchHeader />,
    );

    expect(!!container.querySelector(searchHeaderSelector)).toBe(true);
  });
});
