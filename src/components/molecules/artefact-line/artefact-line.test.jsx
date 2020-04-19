
import React from 'react';
import { render } from '@testing-library/react';

import ArtefactLine from '.';

describe('Molecules/ArtefactLine', () => {
  /* Element selectors */
  const artefactLineSelector = '[data-component="molecules/artefact-line"]';

  it('renders correctly', () => {
    const { container } = render(
      <ArtefactLine />,
    );

    expect(!!container.querySelector(artefactLineSelector)).toBe(true);
  });
});
