
import React from 'react';
import Helmet from 'react-helmet';

import { graphql } from 'gatsby';

import Navigation from '~/components/molecules/navigation';
import GraphicsOverview from '~/components/organisms/graphics-overview';

export default ({ data }) => {
  const graphics = data.allGraphicsUrlsJson.edges.reduce((acc, edge) => {
    acc.push(edge.node);
    return acc;
  }, []);

  const rawItems = data.allGraphicsJson.edges.reduce((acc, edge) => {
    acc.push(...edge.node.items);
    return acc;
  }, []);

  const items = rawItems.map((rawItem) => {
    const updatedItem = {
      ...rawItem,
      image: {
        small: '',
        medium: '',
        large: '',
      },
    };

    const referenceInventoryNumbers = rawItem.references.map(
      (reference) => reference.inventoryNumber,
    );

    const foundGraphic = referenceInventoryNumbers.reduce((acc, inventoryNumber) => {
      if (acc) {
        return acc;
      }

      const foundMatchingGraphic = graphics.find(
        (currGraphics) => currGraphics.inventoryNumber === inventoryNumber,
      );

      if (foundMatchingGraphic) {
        return foundMatchingGraphic;
      }

      return acc;
    }, null);

    if (foundGraphic) {
      updatedItem.image = foundGraphic.image;
    }

    return updatedItem;
  });

  return (
    <div
      className="index"
    >
      <Helmet>
        <title>Cranach Digital Archive | Home</title>
      </Helmet>

      <div
        className="page"
      >
        <Navigation />

        <main
          className="container is-fluid"
        >
          <GraphicsOverview items={ items } />
        </main>
      </div>
    </div>
  );
};

export const query = graphql`
  query VirtualCranachGraphicObjects {
    allGraphicsJson(filter: {items: {elemMatch: {isVirtual: {eq: true}, langCode: {eq: "de"}}}}) {
      edges {
        node {
          items {
            langCode
            slug
            objectName
            inventoryNumber
            objectId
            dating {
              dated
            }
            isVirtual
            sortingNumber
            titles {
              remarks
              title
              type
            }
            references {
              inventoryNumber
            }
          }
        }
      }
    }
    allGraphicsUrlsJson {
      edges {
        node {
          inventoryNumber
          image {
            small
            medium
            large
          }
        }
      }
    }
  }
`;
