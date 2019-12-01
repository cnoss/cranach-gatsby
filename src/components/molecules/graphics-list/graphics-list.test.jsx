
import React from 'react';
import { render } from '@testing-library/react';

import GraphicsList from '.';

const dummyGraphicItems = require('./example-data');

describe('Molecules/GraphicsList', () => {
  /* Element selectors */
  const graphicsListSelector = '[data-component="molecules/graphics-list"]';
  const graphicItemSelector = '.graphic-item';

  it('renders correctly', () => {
    const { container } = render(
      <GraphicsList items={ [] } />,
    );

    expect(!!container.querySelector(graphicsListSelector)).toBe(true);
  });

  it('renders the correct number of graphic items', () => {
    const firstRender = render(
      <GraphicsList items={ [] } />,
    );

    const firstRenderItemEls = firstRender.container.querySelectorAll(graphicItemSelector);

    expect(firstRenderItemEls.length).toBe(0);

    const secondRender = render(
      <GraphicsList items={ dummyGraphicItems } />,
    );

    const secondRenderItemEls = secondRender.container.querySelectorAll(graphicItemSelector);

    expect(secondRenderItemEls.length).toBe(dummyGraphicItems.length);
  });
});
