
const Transformers = {
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

    return {
      inventoryNumber: item.inventoryNumber,
      title: (item.titles[0] && item.titles[0].title) || '',
      subtitle: inventor ? inventor.name : ' ',
      date: item.dating.dated || '',
      masterData: item,
      classification: item.classification.classification,
      to: `/${item.langCode}/${item.slug}`,
      imgSrc: (item && item.images && item.images.sizes.s && item.images.sizes.s.src),
    };
  },
};

module.exports = Transformers;
