
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


const searchGloballyRandomizedByLang = lang => fetch(
  `http://localhost:3000/random?lang=${lang}`,
).then(resp => resp.json());


export default {
  searchGloballyFor: (_, lang) => searchGloballyRandomizedByLang(lang),
};
