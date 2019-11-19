
import React from 'react';
import { render } from '@testing-library/react';

import LeporelloGraphicItem from '.';

describe('Molecules/LeporelloGraphicItem', () => {
  /* Element selectors */
  const leporelloGraphicItemSelector = '[data-component="molecules/leporello-graphic-item"]';

  it('renders correctly', () => {
    const { container } = render(
      <LeporelloGraphicItem />,
    );

    expect(!!container.querySelector(leporelloGraphicItemSelector)).toBe(true);
  });
});
