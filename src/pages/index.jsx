import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import Header from '../components/header';

import GraphicsOverview from '../components/organisms/graphics-overview';

const Container = styled.div`
  width: 1400px;
  margin: 0 auto;
  background-color: #333333;
  padding: 1.25rem;
  color: #B4B4B4;
`;

export default ({ data }) => {
  const items = data.allGraphicsJson.edges.reduce((acc, edge) => {
    acc.push(...edge.node.items);
    return acc;
  }, []);

  return (
    <Container>
      <div className="page">
        <Header />
        <main>
          <GraphicsOverview items={items}></GraphicsOverview>
        </main>
      </div>
    </Container>
  )
}

export const query = graphql`
  query VirtualCranachGraphicObjects {
    allGraphicsJson(filter: {items: {elemMatch: {isVirtual: {eq: true}, langCode: {eq: "de"}}}}) {
      edges {
        node {
          items {
            langCode
            objectName
            inventoryNumber
            objectId
            isVirtual
            sortingNumber
            titles {
              remarks
              title
              type
            }
          }
        }
      }
    }
  }
`;