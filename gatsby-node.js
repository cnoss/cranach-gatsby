// gatsby-node.js
const path = require('path');

const virtualObjectPageTemplate = path.resolve('src/templates/virtual-object-page.jsx');
const realObjectPageTemplate = path.resolve('src/templates/real-object-page.jsx');

/* TODO: use function already found in graphics transformer lib */
const getRepresentativeImageVariant = (item) => {
  const emptyImageType = {
    infos: {
      maxDimensions: {
        width: 0,
        height: 0,
      },
    },
    variants: [
      ['xs', 's', 'm', 'l', 'xl'].reduce(
        (acc, size) => {
          acc[size] = { src: '', dimensions: { width: 0, height: 0 } };
          return acc;
        },
        {},
      ),
    ],
  };
  const imageType = item.images.overall || emptyImageType;

  return imageType.variants[imageType.variants.length - 1];
};

const referenceResolver = (graphic, graphics, references) => references.reduce((acc, referenceItem) => {
  const foundReferencesItem = graphics.find(
    currItem => currItem.inventoryNumber === referenceItem.inventoryNumber
        && currItem.metadata.langCode === graphic.metadata.langCode,
  );

  if (!foundReferencesItem) {
    return acc;
  }

  const newReferenceItem = {
    ...referenceItem,
    ref: { ...foundReferencesItem },
  };

  acc.push(newReferenceItem);

  return acc;
}, []);

/* Grafikverknüpfung */
const extendGraphicReferences = (items, item) => ({
  ...item,
  references: {
    reprints: referenceResolver(item, items, item.references.reprints),
    relatedWorks: referenceResolver(item, items, item.references.relatedWorks),
  },
});

const createGraphicPages = (graphics, actions) => {
  const { createPage } = actions;

  const graphicsWithImages = graphics
    .filter(graphic => graphic.images)
    .map(graphic => ({
      ...graphic,
      representativeImage: getRepresentativeImageVariant(graphic),
    }));

  const extendedGraphicsWithExtendedReferences = graphicsWithImages.map(
    graphic => extendGraphicReferences(graphicsWithImages, graphic),
  );

  extendedGraphicsWithExtendedReferences.forEach((graphic) => {
    const component = graphic.isVirtual
      ? virtualObjectPageTemplate
      : realObjectPageTemplate;

    createPage({
      path: `${graphic.metadata.langCode}/${graphic.slug}`,
      component,
      context: {
        ...graphic,
      },
    });
  });
};

exports.onCreateNode = ({ node }) => {
  if (node && node.internal.type !== 'GraphicsJson') {
    return;
  }

  node.items.forEach((item) => {
    /* eslint-disable-next-line */
    item.slug = item.inventoryNumber;
  });
};

exports.createPages = ({ graphql, actions }) => {
  /*
    Filterung per grapqhql möglich:

     Z. B. nur alle deutschen virtuellen Objekte anfragen
      allContentJson(filter: {
        items: {
          elemMatch: {
            isVirtual: {eq: true},
            metadata: { langCode: {eq: "de"} }
          }
        }
      }) {
   */
  const pagesData = graphql(`
    query CranachGraphicObjects {
      allGraphicsJson {
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
              isVirtual
              sortingNumber
              representativeObject
              titles {
                remarks
                title
                type
              }
              bibliography
              catalogWorkReferences {
                description
                referenceNumber
                remarks
              }
              classification {
                classification
                condition
                printProcess
              }
              conditionLevel
              dating {
                begin
                dated
                end
                historicEventInformations {
                  begin
                  end
                  eventType
                  remarks
                  text
                }
                remarks
              }
              description
              dimensions
              exhibitionHistory
              inscription
              involvedPersons {
                alternativeName
                date
                id
                isUnknown
                name
                nameType
                prefix
                remarks
                role
                suffix
              }
              involvedPersonsNames {
                constituentId
                details {
                  name
                  nameType
                }
              }
              markings
              locations {
                path
                term
                type
              }
              medium
              owner
              provenance
              publications {
                pageNumber
                referenceId
                title
              }
              relatedWorks
              references {
                reprints {
                  inventoryNumber
                  remark
                  text
                }
                relatedWorks {
                  inventoryNumber
                  remark
                  text
                }
              }
              repository
              signature
              structuredDimension {
                element
                height
                width
              }
              additionalTextInformation {
                text
                type
                year
              }
              keywords {
                type
                term
                path
                url
              }
              restorationSurveys {
                type
                project
                overallAnalysis
                remarks
                tests {
                  kind
                  text
                  purpose
                  remarks
                }
                involvedPersons {
                  role
                  name
                }
                processingDates {
                  beginDate
                  beginYear
                  endDate
                  endYear
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
                overall {
                  infos {
                    maxDimensions {
                      width
                      height
                    }
                  }
                  variants {
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
            }
          }
        }
      }
    }
  `);

  return pagesData.then((res) => {
    if (res.errors) {
      console.error(res.errors);
      return;
    }

    const mergedAndFlattenedItems = res.data.allGraphicsJson.edges.reduce(
      (acc, edge) => acc.concat(...edge.node.items), [],
    );

    createGraphicPages(mergedAndFlattenedItems, actions);
  });
};
