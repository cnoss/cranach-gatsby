import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { mediaQuery } from '~/styles/mixins/media-query';

import GraphicCard from '~/components/molecules/graphic-card';

const gridContainerStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1.6rem;
  grid-row-gap: 1.6rem;
  list-style: none;

  ${mediaQuery.sm()} {
    grid-template-columns: 1fr 1fr;
  }
  ${mediaQuery.md()} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  ${mediaQuery.lg()} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const gridItemStyle = css`
  display: contents;
`;

export default ({ items = [] }) => (
  <ul
    css={ gridContainerStyle }
  >
    {
      items.map(item => (
        <li
          key={ item.inventoryNumber }
          css={ gridItemStyle }
        >
          <Link to={ `/${item.langCode}/${item.slug}` }>
            <GraphicCard
              title={ (item.titles[0] && item.titles[0].title) || '' }
              imgSrc={ item.imgSrc || 'https://via.placeholder.com/400x700/000000/666666' }
            />
          </Link>
        </li>
      ))
    }
  </ul>
);
