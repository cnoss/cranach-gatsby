
import React from 'react';
import { render } from '@testing-library/react';

import LeporelloArtefactRelatedWorksItem from '.';

describe('Organisms/LeporelloArtefactRelatedWorksItem', () => {
  /* Element selectors */
  const leporelloArtefactRelatedWorksItemSelector = '[data-component="organisms/leporello-graphic-related-works-item"]';

  it('renders correctly', () => {
    const { container } = render(
      <LeporelloArtefactRelatedWorksItem />,
    );

    expect(!!container.querySelector(leporelloArtefactRelatedWorksItemSelector)).toBe(true);
  });
});
