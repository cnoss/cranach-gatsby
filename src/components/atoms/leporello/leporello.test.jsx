
import React from 'react';
import { render } from '@testing-library/react';

import Leporello from '.';

describe('Atoms/Leporello', () => {
  /* Element selectors */
  const leporelloSelector = '[data-component="atoms/leporello"]';

  it('renders correctly', () => {
    const { container } = render(
      <Leporello />,
    );

    expect(!!container.querySelector(leporelloSelector)).toBe(true);
  });

  it('item has indicator class assigned if open', () => {
    const leporelloItems = [
      {
        text: 'First leporello item',
        className: 'first-item',
        isOpen: false,
      },
      {
        text: 'Second leporello item',
        className: 'second-item',
        isOpen: true,
      },
      {
        text: 'Third leporello item',
        className: 'third-item',
        isOpen: false,
      },
    ];

    const { container } = render(
      <Leporello>
        {
          leporelloItems.map(
            item => (<Leporello.Item
              key={ item.className }
              isOpen={ item.isOpen }
              className={ item.className }
            >
              { item.text }
            </Leporello.Item>),
          )
        }
      </Leporello>,
    );

    leporelloItems.forEach((item) => {
      const itemEl = container.querySelector(`.${item.className}`);
      expect(itemEl.classList.contains('-is-open')).toBe(item.isOpen);
    });
  });
});
