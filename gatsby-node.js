// gatsby-node.js
const path = require('path');

const virtualObjectPageTemplate = path.resolve('src/templates/virtual-object-page.jsx');
const realObjectPageTemplate = path.resolve('src/templates/real-object-page.jsx');

/* TODO: use function already found in graphics transformer lib */
const getRepresentativeImage = (item) => {
  const emptyImageType = {
    infos: {
      maxDimensions: {
        width: 0,
        height: 0,
      },
    },
    images: [
      ['xsmall', 'small', 'medium', 'origin'].reduce(
        (acc, size) => {
          acc[size] = { src: '', dimensions: { width: 0, height: 0 } };
          return acc;
        },
        {},
      ),
    ],
  };
  const imageType = (item.images && (item.images.representative || item.images.overall)) || emptyImageType;

  return imageType.images[imageType.images.length - 1];
};

const toHaveRepresentativeImage = (graphic) => {
  return ({
    ...graphic,
    representativeImage: getRepresentativeImage(graphic),
  });
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


const groupPersonsByRole = (persons) => persons.reduce(
  (acc, person) => {
    acc[person.role] = acc[person.role] || [];
    acc[person.role].push(person.name);
    return acc;
  },
  {},
);


const getConnectedObject = (item, graphicInventoryNumber) => {
  const foundLiteratureItem = item.connectedObjects.find(
    (cObj) => cObj.inventoryNumber === graphicInventoryNumber
  );

  return foundLiteratureItem || {
    pageNumber: '',
    catalogNumber: '',
    figureNumber: '',
  };
};

const toPrimaryLiterature = (publication, literatureItem, connectedObject) => {
  const PERIOD_OF_ORIGIN_TYPE = 'PERIOD_OF_ORIGIN';
  const periodOfOriginEvent = literatureItem.events.find(
    (event) => event.type === PERIOD_OF_ORIGIN_TYPE,
  );

  const periodOfOrigin = (periodOfOriginEvent && `${periodOfOriginEvent.dateText} ${periodOfOriginEvent.remarks}`) || '';

  return {
    id: publication.referenceId,
    shortTitle: publication.title,
    pageNumber: connectedObject.pageNumber,
    catalogNumber: connectedObject.catalogNumber,
    figureNumber: connectedObject.figureNumber,

    roles: groupPersonsByRole(literatureItem.persons),
    title: literatureItem.longTitle || '',
    pageNumbers: literatureItem.pageNumbers || '',
    series: literatureItem.series || '',
    volume: literatureItem.volume || '',
    journal: literatureItem.journal || '',
    issue: literatureItem.edition || '',
    publication: literatureItem.subtitle || '',
    publishLocation: literatureItem.publishLocation || '',
    publishDate: literatureItem.publishDate || '',
    periodOfOrigin: periodOfOrigin,
    physicalDescription: literatureItem.physicalDescription || '',
    mention: literatureItem.mention || '',
    link: literatureItem.copyright || '',
    alternateNumbers: literatureItem.alternateNumbers || [],
  };

};

const toSecondaryLiterature = (publication, literatureItem, connectedObject) => ({
  id: publication.referenceId,
  shortTitle: publication.title,
  pageNumber: connectedObject.pageNumber,
  catalogNumber: connectedObject.catalogNumber,
  figureNumber: connectedObject.figureNumber,

  roles: groupPersonsByRole(literatureItem.persons),
  title: literatureItem.title || '',
  pageNumbers: literatureItem.pageNumbers || '',
  series: literatureItem.series || '',
  volume: literatureItem.volume || '',
  journal: literatureItem.journal || '',
  issue: literatureItem.edition || '',
  publication: literatureItem.subtitle || '',
  publishLocation: literatureItem.publishLocation || '',
  publishDate: literatureItem.publishDate || '',
  mention: literatureItem.mention || '',
  link: literatureItem.copyright || '',
  alternateNumbers: [],
});


const literatureResolver = (graphic, literatureIndex) => graphic.publications.reduce((acc, publicationItem) => {
  const { langCode } = graphic.metadata;
  const { referenceId } = publicationItem;

  if (literatureIndex[langCode] && literatureIndex[langCode][referenceId]) {
    const foundLiteratureItem = literatureIndex[langCode][referenceId];

    const connectedObject = getConnectedObject(foundLiteratureItem, graphic.inventoryNumber);

    if (foundLiteratureItem.isPrimarySource) {
      const mappedLiteratureItem = toPrimaryLiterature(
        publicationItem,
        foundLiteratureItem,
        connectedObject,
      );
      acc.primary.push(mappedLiteratureItem);
    } else {
      const mappedLiteratureItem = toSecondaryLiterature(
        publicationItem,
        foundLiteratureItem,
        connectedObject,
      );
      acc.secondary.push(mappedLiteratureItem);
    }
  } else {
    console.log(`Missing literature reference for graphic: ${graphic.inventoryNumber} (${referenceId})`);
  }

  return acc;
}, { primary: [], secondary: [] });

/* Grafikverknüpfung */
const toHaveExtendedReferences = (item, items) => ({
  ...item,
  references: {
    reprints: referenceResolver(item, items, item.references.reprints),
    relatedWorks: referenceResolver(item, items, item.references.relatedWorks),
  },
});

const toHaveExtendedLiterature = (graphic, literatureIndex) => ({
  ...graphic,
  publications: literatureResolver(graphic, literatureIndex),
});

const createGraphicPages = (graphics, actions) => {
  const { createPage } = actions;

  graphics.forEach((graphic) => {
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

const toHaveValidAndSortedCatalogWorkReferences = (item) => {
  const descriptionsToBeSkipped = ['Frühere Nummer'];

  /* Sorting catalogWorkReferences */
  const sortingWeight = [
    {
      name: 'Bartsch',
      pos: 1,
    },
    {
      name: 'Hollstein',
      pos: 2,
    },
    {
      name: 'GND',
      pos: 3,
    },
  ];

  const byValidReferences = (reference) => !descriptionsToBeSkipped.includes(reference.description);
  const getPatternPos = (str) => {
    const foundSortingWeight = sortingWeight.find((sw) => str === sw.name);

    return foundSortingWeight ? foundSortingWeight.pos : Number.MAX_SAFE_INTEGER;
  };
  const byDescription = (a, b) => getPatternPos(b.description) - getPatternPos(a.description);

  const validAndSortedCatalogWorkReferences = item.catalogWorkReferences.filter(byValidReferences)
    .sort(byDescription)

  return {
    ...item,
    catalogWorkReferences: validAndSortedCatalogWorkReferences,
  }
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

   const imageTypeStructure = `
    infos {
      maxDimensions {
        width
        height
      }
    }
    images {
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
  `;

  const graphicsPromise = graphql(`
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
              images {
                overall {
                  ${imageTypeStructure}
                }
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
                  keywords {
                    name
                    additional
                  }
                }
                involvedPersons {
                  role
                  name
                }
                processingDates {
                  beginDate
                  endDate
                }
                signature {
                  date
                  name
                }
              }
            }
          }
        }
      }
    }
  `);

  const literaturePromise = graphql(`
    query CranachLiteratureObjects {
      allLiteratureJson {
        edges {
          node {
            items {
              alternateNumbers {
                description
                number
                remarks
              }
              connectedObjects {
                catalogNumber
                figureNumber
                inventoryNumber
                pageNumber
                remarks
              }
              copyright
              date
              edition
              events {
                dateBegin
                dateEnd
                dateText
                remarks
                type
              }
              isPrimarySource
              journal
              longTitle
              mention
              metadata {
                classification
                date
                entityType
                id
                imgSrc
                langCode
                subtitle
                title
              }
              pageNumbers
              persons {
                name
                role
              }
              physicalDescription
              publications {
                remarks
                type
              }
              publishDate
              publishLocation
              referenceId
              referenceNumber
              series
              shortTitle
              subtitle
              title
              volume
            }
          }
        }
      }
    }
  `);

  return Promise.all([graphicsPromise, literaturePromise]).then(([graphics, literature]) => {
    if (graphics.errors) {
      console.error(graphics.errors);
      return;
    }

    if (literature.errors) {
      console.error(literature.errors);
      return;
    }

    const mergedAndFlattenedGraphics = graphics.data.allGraphicsJson.edges.reduce(
      (acc, edge) => acc.concat(...edge.node.items), [],
    );

    const preparedLiteratureIndex = literature.data.allLiteratureJson.edges.reduce(
      (acc, edge) => edge.node.items.reduce((subAcc, item) => {
        const { langCode } = item.metadata;
        subAcc[langCode] = subAcc[langCode] || {};

        subAcc[langCode][item.referenceId] = item;

        return subAcc;
      }, acc), {},
    );

    const extendedGraphics = mergedAndFlattenedGraphics
      //.filter(graphic => graphic.images)
      .map(toHaveRepresentativeImage)
      .map(toHaveValidAndSortedCatalogWorkReferences)
      .map((graphic) => toHaveExtendedLiterature(graphic, preparedLiteratureIndex))
      .map((graphic, _, arr) => toHaveExtendedReferences(graphic, arr));

    createGraphicPages(extendedGraphics, actions);
  });
};
