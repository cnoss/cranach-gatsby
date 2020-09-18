
import React from 'react';
import { render } from '@testing-library/react';

import Btn from '.';

describe('Atoms/Btn', () => {
  /* Element selectors */
  const btnSelector = '[data-component="atoms/btn"]';

  it('renders correctly', () => {
    const { container } = render(
      <Btn />,
    );

    expect(!!container.querySelector(btnSelector)).toBe(true);
  });
});
