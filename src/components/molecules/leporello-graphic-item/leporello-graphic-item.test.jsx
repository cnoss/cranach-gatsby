
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import LeporelloGraphicItem from '.';

describe('Molecules/LeporelloGraphicItem', () => {
  /* Element selectors */
  const leporelloGraphicItemSelector = '[data-component="molecules/leporello-graphic-item"]';
  const togglerSelector = '[data-component="atoms/toggler"]';
  const isOpenSelector = '.-is-open';

  it('renders correctly', () => {
    const { container } = render(
      <LeporelloGraphicItem />,
    );

    expect(!!container.querySelector(leporelloGraphicItemSelector)).toBe(true);
  });

  it('is toggled on button click', () => {
    const spy = jest.fn();

    const { container } = render(
      <LeporelloGraphicItem onToggle={ spy } />,
    );

    const togglerEl = container.querySelector(togglerSelector);

    expect(spy).toHaveBeenCalledTimes(0);

    expect(!!container.querySelector(isOpenSelector)).toBe(false);

    fireEvent.click(togglerEl);

    expect(!!container.querySelector(isOpenSelector)).toBe(true);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);

    fireEvent.click(togglerEl);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(false);
  });
});
