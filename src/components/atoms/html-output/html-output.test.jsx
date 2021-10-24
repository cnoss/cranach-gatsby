
import React from 'react';
import { render } from '@testing-library/react';

import HtmlOutput from '.';

describe('Atoms/HtmlOutput', () => {
  /* Element selectors */
  const htmlOutputSelector = '[data-component="atoms/html-output"]';

  it('renders correctly', () => {
    const { container } = render(
      <HtmlOutput />,
    );

    expect(!!container.querySelector(htmlOutputSelector)).toBe(true);
  });
});
