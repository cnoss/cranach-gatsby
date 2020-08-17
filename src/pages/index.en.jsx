
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import { graphql } from 'gatsby';

import Navigation from '~/components/molecules/navigation';
import ArtefactOverview from '~/components/organisms/artefact-overview';
import SearchOverview from '~/components/organisms/search-overview';

import graphic from '~/libs/transformers/graphic';

import i18n from '~/i18n';

import {
  searchFor,
  getSearchTerm,
  getSearchLoading,
  getSearchResultItems,
} from '~/features/globalSearch/globalSearchSlice';


export default ({ data }) => {
  i18n('en');

  const items = graphic.flattenGraphQlEdges(data.allGraphicsJson)
    .filter(graphic.byImageExistence)
    .map(graphic.toArtefact);

  const [currentArtefactView, setCurrentArtefactView] = useState(ArtefactOverview.DefaultView);
  const dispatch = useDispatch();
  const searchTerm = useSelector(getSearchTerm);
  const searchIsCurrentlyLoading = useSelector(getSearchLoading);
  const searchResultItems = useSelector(getSearchResultItems);

  return (
    <div
      className="page"
      data-page="index.en"
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
              items={ items }
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

export const query = graphql`
  query EnglishVirtualCranachGraphicObjects {
    allGraphicsJson(filter: {
      items: {
        elemMatch: {
          isVirtual: {
            eq: true
          },
          langCode: {
            eq: "en"
          },
        }
      }
    }) {
      edges {
        node {
          items {
            langCode
            slug
            objectName
            inventoryNumber
            objectId
            dimensions
            dating {
              dated
            }
            isVirtual
            sortingNumber
            titles {
              remarks
              title
              type
            }
            classification {
              classification
              condition
              printProcess
            }
            references {
              reprints {
                inventoryNumber
              }
              relatedWorks {
                inventoryNumber
              }
            }
            images {
              infos {
                maxDimensions {
                  width
                  height
                }
              }
              sizes {
                xs {
                  dimensions {
                    width
                    height
                  }
                  src
                }
                s {
                  dimensions {
                    width
                    height
                  }
                  src
                }
                m {
                  dimensions {
                    width
                    height
                  }
                  src
                }
                l {
                  dimensions {
                    width
                    height
                  }
                  src
                }
                xl {
                  dimensions {
                    width
                    height
                  }
                  src
                }
              }
            }
            involvedPersons {
              name
              role
            }
          }
        }
      }
    }
  }
`;
