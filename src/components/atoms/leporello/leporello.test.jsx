
import React from 'react';
import { render } from '@testing-library/react';

import Leporello from '.';

describe('Atoms/Leporello', () => {
  /* Element selectors */
  const leporelloSelector = '[data-component="atoms/leporello"]';

  it('renders correctly', () => {
    const { container } = render(
      <Leporello />,
    );

    expect(!!container.querySelector(leporelloSelector)).toBe(true);
  });
});
