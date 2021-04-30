import React, { Fragment, useState } from 'react';
import { useTranslation } from '~/i18n';

import translations from './translations.json';
import './literature-table.scss';

export default ({
  items = [],
  forPrimary = false,
  className = '',
}) => {
  const { t } = useTranslation('LiteratureTable', translations);

  const [detailsVisibilities, setDetailsVisibilities] = useState(Array(items.length).fill(false));
  const toggleDetailsVisibility = (i) => setDetailsVisibilities(
    Object.assign([...detailsVisibilities], { [i]: !detailsVisibilities[i] }),
  );

  const mapRoleToTranslationCode = (role) => {
    const maps = {
      AUTHOR: 'Author',
      PUBLISHER: 'Publisher',
      EDITORIAL_STAFF: 'Editorial staff',
      EDITING: 'Editing',
      ILLUSTRATOR: 'Illustrator',
      PUBLISHING_HOUSE: 'Publishing house',
      IN_COLLABORATION: 'In collaboration',
      ILLUSTRATIONS: 'Illustrations',
      TRANSLATION: 'Translation',
      PRINT: 'Print',
      OFFICIN: 'Officin',
      UNKNOWN: 'Unknown',
    };

    return maps[role] || maps.UNKNOWN;
  };

  return (
    <table
      className={ `literature-table ${className}` }
      data-component="molecules/literature-table"
    >
      <thead>
        <tr>
          <th className="literature-table-head"></th>
          <th className="literature-table-head">{ t('Reference on page') }</th>
          { !forPrimary && (<th className="literature-table-head">{ t('Catalog number') }</th>) }
          { !forPrimary && (<th className="literature-table-head">{ t('Figure / plate') }</th>) }
        </tr>
      </thead>
      <tbody>
        { items.map((item, i) => (<Fragment key={ item.id }>
            <tr className={ `literature-item ${detailsVisibilities[i] ? 'literature-item--active' : ''}` } onClick={ () => toggleDetailsVisibility(i) }>
              <td className="literature-table-datum"><span className="literature-item-title">{ item.shortTitle }</span></td>
              <td className="literature-table-datum">{ item.pageNumber }</td>
              { !forPrimary && (<td className="literature-table-datum">{ item.catalogNumber }</td>) }
              { !forPrimary && (<td className="literature-table-datum">{ item.figureNumber }</td>) }
            </tr>
            <tr className={ `literature-item-details ${detailsVisibilities[i] ? '' : 'literature-item-details--hidden'}` }>
              <td className="literature-table-datum" colSpan={ forPrimary ? 2 : 4 }>

                <table className="literature-item-details-table">
                  <tbody>
                    {
                      Object.entries(item.roles).map(([role, names]) => (<tr key={ role }>
                        <td className="literature-item-details-table-title">{ t(mapRoleToTranslationCode(role)) }</td>
                        <td>{ names.join(', ') }</td>
                      </tr>))
                    }

                    { item.title && (<tr>
                        <td className="literature-item-details-table-title">{ t('Title') }</td>
                        <td dangerouslySetInnerHTML={{ __html: item.title }}></td>
                      </tr>)
                    }

                    { item.pageNumbers && (<tr>
                        <td className="literature-item-details-table-title">{ t('Pages') }</td>
                        <td>{ item.pageNumbers }</td>
                      </tr>)
                    }

                    { item.series && (<tr>
                        <td className="literature-item-details-table-title">{ t('Series') }</td>
                        <td>{ item.series }</td>
                      </tr>)
                    }

                    { item.volume && (<tr>
                        <td className="literature-item-details-table-title">{ t('Volume') }</td>
                        <td>{ item.volume }</td>
                      </tr>)
                    }

                    { item.journal && (<tr>
                        <td className="literature-item-details-table-title">{ t('Journal') }</td>
                        <td>{ item.journal }</td>
                      </tr>)
                    }

                    { item.issue && (<tr>
                        <td className="literature-item-details-table-title">{ t('Issue') }</td>
                        <td>{ item.issue }</td>
                      </tr>)
                    }

                    { item.publication && (<tr>
                        <td className="literature-item-details-table-title">{ t('Publication') }</td>
                        <td dangerouslySetInnerHTML={{ __html: item.publication }}></td>
                      </tr>)
                    }

                    { item.publishLocation && (<tr>
                        <td className="literature-item-details-table-title">{ t('Place of publication') }</td>
                        <td>{ item.publishLocation }</td>
                      </tr>)
                    }

                    { item.publishDate && (<tr>
                        <td className="literature-item-details-table-title">{ t('Year of publication') }</td>
                        <td>{ item.publishDate }</td>
                      </tr>)
                    }

                    {
                      item.periodOfOrigin && (<tr>
                        <td className="literature-item-details-table-title">{ t('Period of Origin') }</td>
                        <td>{ item.periodOfOrigin }</td>
                      </tr>)
                    }

                    {
                      item.physicalDescription && (<tr>
                        <td className="literature-item-details-table-title">{ t('Book format') }</td>
                        <td>{ item.physicalDescription }</td>
                      </tr>)
                    }

                    { item.mention && (<tr>
                        <td className="literature-item-details-table-title">{ t('Mention') }</td>
                        <td dangerouslySetInnerHTML={{ __html: item.mention }}></td>
                      </tr>)
                    }

                    { item.link && (<tr>
                        <td className="literature-item-details-table-title">{ t('Link') }</td>
                        <td>{ item.link }</td>
                      </tr>)
                    }

                    {
                      item.alternateNumbers.length > 0 && item.alternateNumbers.map(
                        (alternateNumber) => (<tr>
                          <td className="literature-item-details-table-title">{ t(alternateNumber.description) }</td>
                          <td>{ alternateNumber.number }</td>
                        </tr>),
                      )
                    }
                  </tbody>
                </table>

              </td>
            </tr>
          </Fragment>
        )) }
      </tbody>
    </table>
  );
};
