
const createDummyData = term => [
  { id: '1', type: 'graphic', term },
  { id: '2', type: 'painting', term },
  { id: '3', type: 'literature', term },
  { id: '4', type: 'archival', term },
];

/* TODO: binding to real existing api endpoint */
/*
export const searchGloballyFor = term => Promise.resolve(createDummyData(term));
*/

export const searchGloballyFor = term => new Promise((resolve) => {
  setTimeout(() => resolve(createDummyData(term)), 2000);
});
