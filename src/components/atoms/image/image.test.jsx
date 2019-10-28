
import React from 'react';
import { render } from '@testing-library/react';

import Image from '.';

describe('Atoms/Image', () => {
  /* Element selectors */
  const imageSelector = '[data-component="atoms/image"]';

  it('renders correctly', () => {
    const { container } = render(
      <Image/>,
    );

    expect(!!container.querySelector(imageSelector)).toBe(true);
  });
});
