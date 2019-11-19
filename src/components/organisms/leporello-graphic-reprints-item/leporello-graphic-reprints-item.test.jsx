
import React from 'react';
import { render } from '@testing-library/react';

import LeporelloGraphicReprintsItem from '.';

const slimDummyGraphic = {
  references: [
    {
      ref: {
        owner: 'Me',
        langCode: 'de',
        slug: 'slug',
        image: {
          small: 'http://url-to.image/image.jpeg',
        },
      },
    },
  ],
};

describe('Organisms/LeporelloGraphicReprintsItem', () => {
  /* Element selectors */
  const leporelloGraphicReprintsItemSelector = '[data-component="organisms/leporello-graphic-reprints-item"]';

  it('renders correctly', () => {
    const { container } = render(
      <LeporelloGraphicReprintsItem graphic={ slimDummyGraphic } />,
    );

    expect(!!container.querySelector(leporelloGraphicReprintsItemSelector)).toBe(true);
  });
});
