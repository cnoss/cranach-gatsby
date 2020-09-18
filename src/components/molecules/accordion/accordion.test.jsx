
import React from 'react';
import { render } from '@testing-library/react';

import Accordion from '.';

describe('Molecules/Accordion', () => {
  /* Element selectors */
  const accordionSelector = '[data-component="molecules/accordion"]';

  it('renders correctly', () => {
    const { container } = render(
      <Accordion />,
    );

    expect(!!container.querySelector(accordionSelector)).toBe(true);
  });
});
