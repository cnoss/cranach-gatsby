
import cranachCfg from '~/cranach.config';

const { titleLength } = cranachCfg;

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

    return {
      inventoryNumber: item.inventoryNumber,
      title,
      titleShort,
      subtitle: inventor ? inventor.name : ' ',
      date: item.dating.dated || '',
      masterData: item,
      classification,
      to: `/${item.langCode}/${item.slug}`,
      imgSrc: (item && item.images && item.images.sizes.s && item.images.sizes.s.src),
    };
  },
};
