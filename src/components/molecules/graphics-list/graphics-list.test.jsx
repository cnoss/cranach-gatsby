
import React from 'react';
import { render } from '@testing-library/react';

import GraphicsList from '.';

describe('Molecules/GraphicsList', () => {
  /* Element selectors */
  const graphicsListSelector = '[data-component="molecules/graphics-list"]';

  it('renders correctly', () => {
    const { container } = render(
      <GraphicsList items={ [] } />,
    );

    expect(!!container.querySelector(graphicsListSelector)).toBe(true);
  });
});
