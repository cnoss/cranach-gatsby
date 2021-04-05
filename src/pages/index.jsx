import React, { useState } from 'react';
import Helmet from 'react-helmet';

import { graphql } from 'gatsby';

import Navigation from '~/components/molecules/navigation';
import ArtefactOverview from '~/components/organisms/artefact-overview';

import graphic from '~/libs/transformers/graphic';

import i18n from '~/i18n';

export default ({ data }) => {
  i18n('de');

  const items = graphic.flattenGraphQlEdges(data.allGraphicsJson)
    .filter(graphic.byImageExistence)
    .map(graphic.toAddedRepresentativeImage)
    .map(graphic.toArtefact);

  const [currentArtefactView, setCurrentArtefactView] = useState(ArtefactOverview.DefaultView);

  return (
    <div
      className="page"
      data-page="index"
    >
      <Helmet>
        <title>Cranach Digital Archive | Home</title>
      </Helmet>

      <div
        className="page-dark"
      >
        <Navigation>
          <ArtefactOverview.Switcher
            view={ currentArtefactView }
            handleChange={ setCurrentArtefactView }
          />
        </Navigation>

        <main
          className="main-content"
        >
          <ArtefactOverview
            view={ currentArtefactView }
            items={ items }
          />
        </main>
      </div>
    </div>
  );
};

export const query = graphql`
  query VirtualCranachGraphicObjects {
    allGraphicsJson(filter: {
      items: {
        elemMatch: {
          metadata: {
            langCode: { eq: "de" }
          },
          isVirtual: { eq: true }
        }
      }
    }) {
      edges {
        node {
          items {
            metadata {
              langCode
            }
            slug
            objectName
            inventoryNumber
            objectId
            dimensions
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
            classification {
              classification
              condition
              printProcess
            }
            references {
              reprints {
                inventoryNumber
              }
              relatedWorks {
                inventoryNumber
              }
            }
            images {
              overall {
                infos {
                  maxDimensions {
                    width
                    height
                  }
                }
                variants {
                  xsmall {
                    dimensions {
                      width
                      height
                    }
                    src
                  }
                  small {
                    dimensions {
                      width
                      height
                    }
                    src
                  }
                  medium {
                    dimensions {
                      width
                      height
                    }
                    src
                  }
                  origin {
                    dimensions {
                      width
                      height
                    }
                    src
                  }
                  tiles {
                    dimensions {
                      width
                      height
                    }
                    src
                  }
                }
              }
            }
            involvedPersons {
              name
              role
            }
          }
        }
      }
    }
  }
`;
