
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import Navigation from '~/components/molecules/navigation';
import ArtefactOverview from '~/components/organisms/artefact-overview';
import SearchOverview from '~/components/organisms/search-overview';

import i18n from '~/i18n';

import {
  searchFor,
  getSearchTerm,
  getSearchLoading,
  getSearchResultItems,
} from '~/features/globalSearch/globalSearchSlice';


export default ({ pageContext }) => {
  const { lang, graphics } = pageContext;
  i18n(lang.code);

  const [currentArtefactView, setCurrentArtefactView] = useState(ArtefactOverview.DefaultView);
  const dispatch = useDispatch();
  const searchTerm = useSelector(getSearchTerm);
  const searchIsCurrentlyLoading = useSelector(getSearchLoading);
  const searchResultItems = useSelector(getSearchResultItems);

  return (
    <div
      className="page"
      data-page={ `index.${lang.code}` }
    >
      <Helmet>
        <title>Cranach Digital Archive | Home</title>
      </Helmet>

      <div
        className="page-dark"
      >
        <Navigation>
          <input
            type="text"
            value={searchTerm}
            onChange={e => dispatch(searchFor(e.target.value.trim()))}
          />

          <ArtefactOverview.Switcher
            view={ currentArtefactView }
            handleChange={ setCurrentArtefactView }
          />
        </Navigation>

        <main
          className="main-content"
        >
          {!searchTerm
          && (
            <ArtefactOverview
              view={ currentArtefactView }
              items={ graphics }
            />
          )
          }

          {searchTerm && (
            <SearchOverview
              isLoading={searchIsCurrentlyLoading}
              items={searchResultItems}
            />
          )}
        </main>
      </div>
    </div>
  );
};
