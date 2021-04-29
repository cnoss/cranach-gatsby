
import React from 'react';
import { render } from '@testing-library/react';

import Viewer from '.';

describe('Organisms/Viewer', () => {
  /* Element selectors */
  const viewerSelector = '[data-component="organisms/viewer"]';

  it('renders correctly', () => {
    const { container } = render(
      <Viewer />,
    );

    expect(!!container.querySelector(viewerSelector)).toBe(true);
  });
});
