
import React from 'react';
import Helmet from 'react-helmet';

import { graphql } from 'gatsby';

import Header from '~/components/atoms/header';
import TextHero from '~/components/atoms/text-hero';
import Footer from '~/components/atoms/footer';

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
      className="container is-fluid"
    >
      <Helmet>
        <title>Cranach Digital Archive | Home</title>
      </Helmet>
      <div
        className="page"
      >
        <Header />

        <div
          className="page-box"
        >
          <TextHero>
            Lucas Cranach der Ältere verkörpert die Ideale eines Mannes im Zeitalter der
            Renaissance, der neben seiner Tätigkeit als Maler, Grafiker und Buchdrucker auch als
            Politiker und Unternehmer tätig war. 1547 nahm Cranachs Tätigkeit als Hofmaler ein
            vorläufiges Ende, als Kurfürst Johann Friedrich I., der Großmütige, nach der verlorenen
            Schlacht bei Mühlberg von Kaiser Karl V. abgesetzt und gefangengenommen wurde.
            1550 folgte Cranach seinem Herrn ins Exil nach Augsburg und Innsbruck.
          </TextHero>
        </div>

        <main>
          <GraphicsOverview items={items} />
        </main>
      </div>

      <Footer />
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
