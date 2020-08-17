/* Initial redirect to '/de' or 'en' should happen, so we don't have to keep this file up to date */

import React from 'react';
import { graphql } from 'gatsby';
import IndexTemplate from '~/templates/index';

const graphicTransformer = require('~/../libs/transformers/graphic');


export default ({ data }) => {
  const lang = {
    name: 'German',
    code: 'de',
    path: 'de',
  };
  const graphics = graphicTransformer.flattenGraphQlEdges(data.allGraphicsJson)
    .filter(graphicTransformer.byImageExistence)
    .map(graphicTransformer.toArtefact);

  return (<IndexTemplate pageContext={{ lang, graphics }} />);
};


export const query = graphql`
  query DefaultVirtualCranachGraphicObjects {
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
              infos {
                maxDimensions {
                  width
                  height
                }
              }
              sizes {
                xs {
                  dimensions {
                    width
                    height
                  }
                  src
                }
                s {
                  dimensions {
                    width
                    height
                  }
                  src
                }
                m {
                  dimensions {
                    width
                    height
                  }
                  src
                }
                l {
                  dimensions {
                    width
                    height
                  }
                  src
                }
                xl {
                  dimensions {
                    width
                    height
                  }
                  src
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
