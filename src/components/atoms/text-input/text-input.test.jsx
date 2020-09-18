
import React from 'react';
import { render } from '@testing-library/react';

import TextInput from '.';

describe('Atoms/TextInput', () => {
  /* Element selectors */
  const textInputSelector = '[data-component="atoms/text-input"]';

  it('renders correctly', () => {
    const { container } = render(
      <TextInput />,
    );

    expect(!!container.querySelector(textInputSelector)).toBe(true);
  });
});
