
/*
const createDummyData = term => [
  graphics: [],
  paintings: [],
  archivals: [],
];
*/

/* TODO: binding to real existing api endpoint */
/*
export const searchGloballyFor = term => Promise.resolve(createDummyData(term));
*/

/*
export const searchGloballyFor = term => new Promise((resolve) => {
  setTimeout(() => resolve(createDummyData(term)), 2000);
});

*/


const mapGraphicToArtifact = (item) => {
  const inventor = item.involvedPersons.find(person => person.role === 'Inventor');

  return {
    inventoryNumber: item.inventoryNumber,
    title: (item.titles[0] && item.titles[0].title) || '',
    subtitle: inventor ? inventor.name : ' ',
    date: item.dating.dated || '',
    additionalInfoList: [
      `${item.classification.classification}, ${item.classification.printProcess}`,
      item.dimensions,
    ],
    classification: item.classification.classification,
    to: `/${item.langCode}/${item.inventoryNumber}`,
    imgSrc: (item && item.images && item.images.sizes.s && item.images.sizes.s.src),
  };
};

const mapPaintingToArtifact = (item) => {
  const inventor = item.involvedPersons.find(person => person.role === 'Künstler');

  return {
    inventoryNumber: item.inventoryNumber,
    title: (item.titles[0] && item.titles[0].title) || '',
    subtitle: inventor ? inventor.name : ' ',
    date: item.dating.dated || '',
    additionalInfoList: [
      item.classification.classification,
      item.dimensions,
    ],
    classification: item.classification.classification,
    to: `/${item.langCode}/${item.inventoryNumber}`,
    imgSrc: (item && item.images && item.images.sizes.s && item.images.sizes.s.src),
  };
};

const mapArchivalToArtifact = (item) => {
  const summary = item.summaries[0] || '';
  const splitWords = summary.split(' ');
  const title = splitWords.length < 25 ? summary : `${splitWords.slice(0, 24).join(' ')} ...`;

  return {
    inventoryNumber: item.inventoryNumber,
    title,
    subtitle: ' ',
    date: (item.dating && item.dating.dated) || '',
    additionalInfoList: [],
    classification: '',
    to: `/${item.langCode}/${item.inventoryNumber}`,
    imgSrc: '',
  };
};


const searchGloballyRandomizedByLang = lang => fetch(
  `http://localhost:3000/random?lang=${lang}`,
).then(resp => resp.json())
  .then(result => ({
    graphics: result.graphics.map(mapGraphicToArtifact),
    paintings: result.paintings.map(mapPaintingToArtifact),
    archivals: result.archivals.map(mapArchivalToArtifact),
  }));


export const searchGloballyFor = (_, lang) => searchGloballyRandomizedByLang(lang);
