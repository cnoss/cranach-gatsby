
import React from 'react';
import { render } from '@testing-library/react';

import Switcher from '.';

describe('Atoms/Switcher', () => {
  /* Element selectors */
  const switcherSelector = '[data-component="atoms/switcher"]';

  it('renders correctly', () => {
    const { container } = render(
      <Switcher />,
    );

    expect(!!container.querySelector(switcherSelector)).toBe(true);
  });
});
