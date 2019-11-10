
import React from 'react';
import { render } from '@testing-library/react';

import Navigation from '.';


describe('Molecules/GraphicCard', () => {
  /* Element selectors */
  const navigationSelector = '[data-component="molecules/navigation"]';
  const navigationBrandSelector = '.navbar-brand';
  const navigationMenuSelector = '.navbar-menu';
  const navigationEndSelector = '.navbar-end';

  it('renders correctly', () => {
    const { container } = render(
      <Navigation/>,
    );

    expect(!!container.querySelector(navigationSelector)).toBe(true);
    expect(!!container.querySelector(navigationBrandSelector)).toBe(true);
    expect(!!container.querySelector(navigationMenuSelector)).toBe(true);
    expect(!!container.querySelector(navigationEndSelector)).toBe(true);
  });

  /*
    @TODO: Test for partiallyActive when nav-items are passed as props
   */
});
