
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
  const imageType = item.images.representative || item.images.overall || emptyImageType;

  return imageType.variants[imageType.variants.length - 1];
};


const flattenGraphQlEdges = rawItems => rawItems.edges.reduce((acc, edge) => {
  acc.push(...edge.node.items);
  return acc;
}, []);

const byImageExistence = item => !!item.images;

const toArtefact = (item, options = { titleLength: -1 }) => {
  const inventor = item.involvedPersons.find(person => person.role === 'Inventor');
  const classificationLevel2 = (item.objectName) ? item.objectName.replace(/:.*/, '') : false;
  const classification = (item.objectName) ? `${item.classification.classification}, ${classificationLevel2}` : item.classification.classification;
  const title = (item.titles[0] && item.titles[0].title) || '';
  const titleShort = (options.titleLength === -1 || title.length <= options.titleLength) ? title : `${title.substr(0, options.titleLength)}…`;

  const imgSrc = item.representativeImage.s.src || '';

  return {
    inventoryNumber: item.inventoryNumber,
    title,
    titleShort,
    subtitle: inventor ? inventor.name : ' ',
    date: item.dating.dated || '',
    additionalInfoList: [
      `${item.classification.classification}, ${item.classification.printProcess}`,
      item.dimensions,
    ],
    classification,
    to: `/${item.langCode}/${item.slug}`,
    imgSrc,
  };
};

const toArtefactWithOptions = options => item => toArtefact(item, options);

const toAddedRepresentativeImage = item => ({
  ...item,
  representativeImage: getRepresentativeImageVariant(item),
});

module.exports = {
  flattenGraphQlEdges,
  byImageExistence,
  toArtefact,
  toArtefactWithOptions,
  toAddedRepresentativeImage,
};
