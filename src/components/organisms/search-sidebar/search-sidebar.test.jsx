
import React from 'react';
import { render } from '@testing-library/react';

import SearchSidebar from '.';

describe('Organisms/SearchSidebar', () => {
  /* Element selectors */
  const searchSidebarSelector = '[data-component="organisms/search-sidebar"]';

  it('renders correctly', () => {
    const { container } = render(
      <SearchSidebar />,
    );

    expect(!!container.querySelector(searchSidebarSelector)).toBe(true);
  });
});
