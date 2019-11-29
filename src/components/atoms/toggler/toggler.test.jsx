
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Toggler from '.';

describe('Atoms/Toggler', () => {
  /* Element selectors */
  const togglerSelector = '[data-component="atoms/toggler"]';
  const toggledSelector = '.-is-toggled';

  it('renders correctly', () => {
    const { container } = render(
      <Toggler />,
    );

    expect(!!container.querySelector(togglerSelector)).toBe(true);
  });

  it('is initially not toggled', () => {
    const { container } = render(
      <Toggler />,
    );

    const isToggled = !!container.querySelector(toggledSelector);
    expect(isToggled).toBe(false);
  });

  it('is toggled on click', () => {
    const spy = jest.fn();

    const { container } = render(
      <Toggler onToggle={ toggled => spy(toggled) } />,
    );

    const togglerEl = container.querySelector(togglerSelector);

    expect(!!container.querySelector(toggledSelector)).toBe(false);

    expect(spy).toHaveBeenCalledTimes(0);

    fireEvent.click(togglerEl);

    expect(!!container.querySelector(toggledSelector)).toBe(true);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);

    fireEvent.click(togglerEl);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(false);
  });
});
