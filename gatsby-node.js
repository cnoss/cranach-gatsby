// gatsby-node.js
const path = require('path');
const graphicsList = require('./content/graphics-urls.json');

const virtualObjectPageTemplate = path.resolve('src/templates/virtual-object-page.jsx');
const realObjectPageTemplate = path.resolve('src/templates/real-object-page.jsx');

const extendGraphic = (item) => {
  /* Grafikverknüpfung */
  /* TODO: Entfernen, wenn Verknüpfung von Grafiken und Objekte vorher geschehen ist */
  const referenceInventoryNumbers = item.references.map(
    reference => reference.inventoryNumber,
  );

  referenceInventoryNumbers.push(item.inventoryNumber);

  const graphic = referenceInventoryNumbers.reduce((acc, inventoryNumber) => {
    if (acc) {
      return acc;
    }

    const foundGraphic = graphicsList.find(
      currGraphic => currGraphic.inventoryNumber === inventoryNumber,
    );

    if (!foundGraphic) {
      return acc;
    }

    return foundGraphic;
  }, null);

  return {
    ...item,
    image: graphic
      ? { ...graphic.image }
      : {
        small: '',
        medium: '',
        large: '',
        xlarge: '',
      },
  };
};

/* Grafikverknüpfung */
/* TODO: Entfernen, wenn Verknüpfung von Grafiken und Objekte vorher geschehen ist */
const extendGraphicReferences = (items, item) => {
  const extendedReferences = item.references.map((referenceItem) => {
    const foundReferencesItem = items.find(
      currItem => currItem.inventoryNumber === referenceItem.inventoryNumber
        && currItem.langCode === item.langCode,
    );

    return {
      ...referenceItem,
      ref: foundReferencesItem ? { ...foundReferencesItem } : null,
    };
  });

  return {
    ...item,
    references: extendedReferences,
  };
};

const createGraphicPages = (graphics, actions) => {
  const { createPage } = actions;

  const extendedGraphics = graphics.map(graphic => extendGraphic(graphic));
  const extendedGraphicsWithExtendedReferences = extendedGraphics.map(
    graphic => extendGraphicReferences(extendedGraphics, graphic),
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
                inventoryNumber
                remark
                text
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
