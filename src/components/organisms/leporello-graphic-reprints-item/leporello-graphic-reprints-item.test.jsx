
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import LeporelloGraphicReprintsItem from '.';

const dummyGraphic = require('./example-data');

describe('Organisms/LeporelloGraphicReprintsItem', () => {
  /* Element selectors */
  const leporelloGraphicReprintsItemSelector = '[data-component="organisms/leporello-graphic-reprints-item"]';
  const graphicsListItemSelector = '[data-component="molecules/graphics-list"] .graphic-item';
  const togglerSelector = '[data-component="atoms/toggler"]';

  const reprintsItemsLimit = 4;

  it('renders correctly', () => {
    const { container } = render(
      <LeporelloGraphicReprintsItem graphic={ dummyGraphic } />,
    );

    expect(!!container.querySelector(leporelloGraphicReprintsItemSelector)).toBe(true);
  });

  it('renders the correct number of reprint items when closed and opened', () => {
    const { container } = render(
      <LeporelloGraphicReprintsItem graphic={ dummyGraphic } />,
    );

    const reprintItemEls = container.querySelectorAll(graphicsListItemSelector);

    expect(reprintItemEls.length).toBe(reprintsItemsLimit);

    const togglerEl = container.querySelector(togglerSelector);

    fireEvent.click(togglerEl);

    const newReprintItemEls = container.querySelectorAll(graphicsListItemSelector);

    expect(newReprintItemEls.length).toBe(dummyGraphic.references.length);
  });
});
