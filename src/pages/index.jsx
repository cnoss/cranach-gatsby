
import React from 'react';
import Helmet from 'react-helmet';

import { graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import { mediaQuery } from '~/styles/mixins/media-query';
import { spacing } from '~/styles/mixins/spacing';

import Header from '~/components/atoms/header';
import TextHero from '~/components/atoms/text-hero';
import Footer from '~/components/atoms/footer';

import GraphicsOverview from '~/components/organisms/graphics-overview';

const containerStyle = css`
  margin: 0 auto;
  background-color: #333333;
  color: #B4B4B4;
`;

const pageStyle = css`
  ${mediaQuery.lg()} {
    width: 1400px;
    margin: 0 auto;
  }
`;

const boxStyle = css`
  ${mediaQuery.md()} {
    width: 50%;
  }

  ${spacing('bottom', '2rem')}
`;

const mainStyle = css`
  margin-bottom: 2.5rem;
`;

const footerLinkStyle = css`
  text-decoration: none;
  color: #FFFFFF;
`;

export default ({ data }) => {
  const graphicsUrls = data.allGraphicsUrlsJson.edges.reduce((acc, edge) => {
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
      imgSrc: '',
    };

    const referenceInventoryNumbers = rawItem.references.map(
      reference => reference.inventoryNumber,
    );

    const foundGraphicUrl = referenceInventoryNumbers.reduce((acc, inventoryNumber) => {
      if (acc) {
        return acc;
      }

      const foundMatchingGraphicUrl = graphicsUrls.find(
        currGraphicsUrl => currGraphicsUrl.inventoryNumber === inventoryNumber,
      );

      if (foundMatchingGraphicUrl) {
        return foundMatchingGraphicUrl;
      }

      return acc;
    }, null);

    if (foundGraphicUrl) {
      updatedItem.imgSrc = foundGraphicUrl.imgSrc;
    }

    return updatedItem;
  });

  return (
    <div
      className="container"
      css={ containerStyle }
    >
      <Helmet>
        <title>Cranach Digital Archive - Grafiken</title>
      </Helmet>
      <div
        className="page"
        css={ pageStyle }
      >
        <Header />

        <div
          className="page-box"
          css={ boxStyle }
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

        <main
          css={ mainStyle }
        >
          <GraphicsOverview items={items} />
        </main>
      </div>

      <Footer>
        <Link
          to="/"
          css={ footerLinkStyle }
        >© 2019 / Cranach Digital Archive</Link>
      </Footer>
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
          imgSrc
        }
      }
    }
  }
`;
