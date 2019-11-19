
import React from 'react';
import { render } from '@testing-library/react';

import LeporelloGraphicRelatedWorksItem from '.';

describe('Organisms/LeporelloGraphicRelatedWorksItem', () => {
  /* Element selectors */
  const leporelloGraphicRelatedWorksItemSelector = '[data-component="organisms/leporello-graphic-related-works-item"]';

  it('renders correctly', () => {
    const { container } = render(
      <LeporelloGraphicRelatedWorksItem />,
    );

    expect(!!container.querySelector(leporelloGraphicRelatedWorksItemSelector)).toBe(true);
  });
});
