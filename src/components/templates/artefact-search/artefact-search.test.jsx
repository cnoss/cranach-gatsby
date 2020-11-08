
import React from 'react';
import { render } from '@testing-library/react';

import ArtefactSearch from '.';

describe('Organisms/ArtefactSearch', () => {
  /* Element selectors */
  const artefactSearchSelector = '[data-component="organisms/artefact-search"]';

  it('renders correctly', () => {
    const { container } = render(
      <ArtefactSearch />,
    );

    expect(!!container.querySelector(artefactSearchSelector)).toBe(true);
  });
});
