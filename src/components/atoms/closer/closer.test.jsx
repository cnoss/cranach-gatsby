
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Closer from '.';

describe('Atoms/Toggler', () => {
  /* Element selectors */
  const togglerSelector = '[data-component="atoms/closer"]';

  it('renders correctly', () => {
    const { container } = render(
      <Closer />,
    );

    expect(!!container.querySelector(togglerSelector)).toBe(true);
  });

  it('emits close event on click', () => {
    const spy = jest.fn();

    const { container } = render(
      <Closer onClose={ closed => spy(closed) } />,
    );

    const togglerEl = container.querySelector(togglerSelector);

    expect(!!container.querySelector(toggledSelector)).toBe(false);

    expect(spy).toHaveBeenCalledTimes(0);

    fireEvent.click(togglerEl);

    expect(!!container.querySelector(toggledSelector)).toBe(true);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
  });
});
