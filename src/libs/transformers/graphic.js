import cranachCfg from '~/cranach.config';

const { titleLength } = cranachCfg;

const getRepresentativeImageVariant = (item) => {
  const emptyImageType = {
    infos: {
      maxDimensions: {
        width: 0,
        height: 0,
      },
    },
    variants: [
      ['xs', 's', 'm', 'origin', 'tiles'].reduce(
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

export default {
  flattenGraphQlEdges(rawItems) {
    return rawItems.edges.reduce((acc, edge) => {
      acc.push(...edge.node.items);
      return acc;
    }, []);
  },

  byImageExistence(item) {
    return !!item.images;
  },

  toArtefact(item) {
    const inventor = item.involvedPersons.find(person => person.role === 'Inventor');
    const classificationLevel2 = (item.objectName) ? item.objectName.replace(/:.*/, '') : false;
    const classification = (item.objectName) ? `${item.classification.classification}, ${classificationLevel2}` : item.classification.classification;
    const title = (item.titles[0] && item.titles[0].title) || '';
    const titleShort = (title.length > titleLength) ? `${title.substr(0, titleLength)}…` : title;

    const imgSrc = item.representativeImage.s.src || '';

    return {
      inventoryNumber: item.inventoryNumber,
      title,
      titleShort,
      subtitle: inventor ? inventor.name : ' ',
      date: item.dating.dated || '',
      masterData: item,
      classification,
      to: `/${item.metadata.langCode}/${item.slug}`,
      imgSrc,
    };
  },

  toAddedRepresentativeImage(item) {
    return {
      ...item,
      representativeImage: getRepresentativeImageVariant(item),
    };
  },
};
