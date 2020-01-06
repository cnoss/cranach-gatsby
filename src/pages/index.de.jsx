
import React from 'react';
import Helmet from 'react-helmet';

import { graphql } from 'gatsby';

import Navigation from '~/components/molecules/navigation';
import ArtefactOverview from '~/components/organisms/artefact-overview';

export default ({ data }) => {
  const rawItems = data.allGraphicsJson.edges.reduce((acc, edge) => {
    acc.push(...edge.node.items);
    return acc;
  }, []);

  const items = rawItems.filter(rawItem => rawItem.hasImage);

  return (
    <div
      className="index"
      data-page="index"
    >
      <Helmet>
        <title>Cranach Digital Archive | Home</title>
      </Helmet>

      <div
        className="page-dark"
      >
        <Navigation />

        <main
          className="main-content"
        >
          <ArtefactOverview items={ items } />
        </main>
      </div>
    </div>
  );
};

export const query = graphql`
  query GermanVirtualCranachGraphicObjects {
    allGraphicsJson(filter: {
      items: {
        elemMatch: {
          isVirtual: {
            eq: true
          },
          langCode: {
            eq: "de"
          },
        }
      }
    }) {
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
            image {
              xsmall
              small
              medium
              large
              xlarge
            }
            hasImage
          }
        }
      }
    }
  }
`;
