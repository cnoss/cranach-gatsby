// gatsby-node.js
const path = require('path');
const graphicsList = require('./content/graphics-urls.json');

const blogPostTemplate = path.resolve('src/templates/page.jsx');

const extendGraphic = (item) => {
  /* Grafikverknüpfung */
  /* TODO: Entfernen, wenn Verknüpfung von Grafiken und Objekte vorher geschehen ist */
  const referenceInventoryNumbers = item.references.map(
    reference => reference.inventoryNumber,
  );

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
      },
  };
};

const createGraphicPages = (graphics, actions) => {
  const { createPage } = actions;

  graphics.forEach((graphic) => {
    const extendedGraphic = extendGraphic(graphic);

    createPage({
      path: `${graphic.langCode}/${graphic.slug}`,
      component: blogPostTemplate,
      context: {
        ...extendedGraphic,
      },
    });
  });
};

exports.onCreateNode = ({ node }) => {
  if (node && node.internal.type !== 'GraphicsJson') {
    return;
  }

  node.items.forEach((item) => {
    /* Slugifying der title fur Nutzung als URL-Pfad */
    /* TODO: Entfernen, wenn slug bereits beim Importieren generiert wird */
    const replaceMap = {
      ä: 'a',
      ö: 'o',
      ü: 'u',
      ß: 'ss',
    };
    const foundTitle = ((item.titles[0] && item.titles[0].title) || '').toLowerCase();
    const slugifiedTitle = foundTitle && Object.entries(replaceMap).reduce(
      (acc, pair) => acc.replace(pair[0], pair[1]),
      foundTitle,
    ).replace(/[^a-z0-9\s]*/g, '').replace(/\s+/g, '-');
    const slug = slugifiedTitle || item.inventoryNumber;

    /* eslint-disable-next-line */
    item.slug = slug;
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
      allGraphicsJson(filter: { items: { elemMatch: { isVirtual: { eq: true } } } }) {
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
              keywords {
                path
                term
                type
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

    res.data.allGraphicsJson.edges.forEach((edge) => {
      createGraphicPages(edge.node.items, actions);
    });
  });
};
