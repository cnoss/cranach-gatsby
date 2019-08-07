import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

import GraphicCard from '@components/molecules/graphic-card';

const GridContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1.6rem;
  grid-row-gap: 1.6rem;
  list-style: none;

  @media only screen and (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media only screen and (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const GridItem = styled.li`
  display: contents;
`;


export default ({ items = [] }) => (
  <GridContainer>
    {
      items.map(item => (
        <GridItem key={ item.inventoryNumber }>
          <Link to={ `/${item.langCode}/${item.inventoryNumber}` }>
            <GraphicCard
              title={ (item.titles[0] && item.titles[0].title) || '' }
              imgSrc={ item.imgSrc || 'https://via.placeholder.com/400x700/000000/666666' }
            />
          </Link>
        </GridItem>
      ))
    }
  </GridContainer>
);
