
import { makeAutoObservable } from 'mobx';


export default class GlobalSearch {
  uiStore;

  globalSearchAPI;

  allFieldsTerm = '';

  loading = false;

  results = {
    graphics: [],
    paintings: [],
    archivals: [],
  };

  error = null;

  constructor(uiStore, globalSearchAPI) {
    makeAutoObservable(this);

    this.uiStore = uiStore;
    this.globalSearchAPI = globalSearchAPI;
  }


  /* Computed */

  get flattenedSearchResultItems() {
    const { graphics, paintings, archivals } = this.results;
    return [...graphics, ...paintings, ...archivals];
  }


  /* Actions */

  setAllFieldsTerm(allFieldsTerm) {
    this.allFieldsTerm = allFieldsTerm;
  }

  setSearchLoading(loading) {
    this.loading = loading;
  }

  setSearchResults(results) {
    this.results = results;
  }

  resetSearchResults() {
    this.results = {
      graphics: [],
      paintings: [],
      archivals: [],
    };
  }

  setSearchFailed(error) {
    this.error = error;
  }

  searchForAllFieldsTerm(allFieldsTerm) {
    const { lang } = this.uiStore;

    this.setAllFieldsTerm(allFieldsTerm);

    if (allFieldsTerm.trim() === '') {
      this.resetSearchResults();
      return;
    }

    this.setSearchLoading(true);

    this.globalSearchAPI.searchGloballyFor(allFieldsTerm, lang).then(
      results => this.setSearchResults(results),
      err => this.setSearchFailed(err.toString()),
    ).finally(
      () => this.setSearchLoading(false),
    );
  }
}
