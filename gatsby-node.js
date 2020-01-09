// gatsby-node.js
const path = require('path');

const virtualObjectPageTemplate = path.resolve('src/templates/virtual-object-page.jsx');
const realObjectPageTemplate = path.resolve('src/templates/real-object-page.jsx');

const referenceResolver = (graphic, graphics, references) => {
  return references.reduce((acc, referenceItem) => {
    const foundReferencesItem = graphics.find(
      currItem => currItem.inventoryNumber === referenceItem.inventoryNumber
        && currItem.langCode === graphic.langCode,
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
};

/* Grafikverknüpfung */
const extendGraphicReferences = (items, item) => {
  return {
    ...item,
    references: {
      reprints: referenceResolver(item, items, item.references.reprints),
      relatedWorks: referenceResolver(item, items, item.references.relatedWorks),
    },
  };
};

const createGraphicPages = (graphics, actions) => {
  const { createPage } = actions;

  const graphicsWithImages = graphics.filter(graphic => graphic.images);

  const extendedGraphicsWithExtendedReferences = graphicsWithImages.map(
    graphic => extendGraphicReferences(graphicsWithImages, graphic),
  );

  extendedGraphicsWithExtendedReferences.forEach((graphic) => {
    const component = graphic.isVirtual
      ? virtualObjectPageTemplate
      : realObjectPageTemplate;

    createPage({
      path: `${graphic.langCode}/${graphic.slug}`,
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
      allContentJson(filter: {items: {elemMatch: {isVirtual: {eq: true}, langCode: {eq: "de"}}}}) {
   */
  const pagesData = graphql(`
    query CranachGraphicObjects {
      allGraphicsJson {
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
              bibliography
              catalogWorkReferences {
                description
                referenceNumber
              }
              classification {
                classification
                condition
              }
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
