
import React from 'react';

import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import Header from '@components/atoms/header';
import TextHero from '@components/atoms/text-hero';

import GraphicsOverview from '@components/organisms/graphics-overview';

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

        <div className="helper-box-medium helper-more-vspace">
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
    </Container>
  );
};

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
