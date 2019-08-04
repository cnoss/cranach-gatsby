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
        <GridItem key={item.inventoryNumber}>
          <Link to={`/${item.langCode}/${item.inventoryNumber}`}>
            <GraphicCard item={item} />
          </Link>
        </GridItem>
      ))
    }
  </GridContainer>
);
