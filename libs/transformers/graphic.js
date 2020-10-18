
function flattenGraphQlEdges(rawItems) {
  return rawItems.edges.reduce((acc, edge) => {
    acc.push(...edge.node.items);
    return acc;
  }, []);
}

function byImageExistence(item) {
  return !!item.images;
}

function toArtefact(item, options = { titleLength: Number.POSITIVE_INFINITY }) {
  const inventor = item.involvedPersons.find(person => person.role === 'Inventor');
  const classificationLevel2 = (item.objectName) ? item.objectName.replace(/:.*/, '') : false;
  const classification = (item.objectName) ? `${item.classification.classification}, ${classificationLevel2}` : item.classification.classification;
  const title = (item.titles[0] && item.titles[0].title) || '';
  const titleShort = (title.length > options.titleLength) ? `${title.substr(0, options.titleLength)}…` : title;

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
    imgSrc: (item && item.images && item.images.sizes.s && item.images.sizes.s.src),
  };
}

function toArtefactWithOptions(options) {
  return item => toArtefact(item, options);
}

module.exports = {
  flattenGraphQlEdges,
  byImageExistence,
  toArtefact,
  toArtefactWithOptions,
};
