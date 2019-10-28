
import React from 'react';
import { render } from '@testing-library/react';

import Logo from '.';

describe('Atoms/Logo', () => {
  /* Element selectors */
  const logoSelector = '[data-component="atoms/logo"]';

  it('renders correctly', () => {
    const { container } = render(
      <Logo/>,
    );

    expect(!!container.querySelector(logoSelector)).toBe(true);
  });
});
