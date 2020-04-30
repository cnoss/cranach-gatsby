import React, { useState, useEffect } from 'react';
import { useTranslation } from '~/i18n';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import DefinitionList from '~/components/atoms/definition-list';
import InvolvedPersonsTable from '~/components/molecules/involved-persons-table';
import LiteratureTable from '~/components/molecules/literature-table';
import Toggler from '~/components/atoms/toggler';
import CopyText from '~/components/atoms/copy-text';
import Image from '~/components/atoms/image';

import translations from './translations.json';
import './leporello-graphic-details-item.scss';

export default ({
  location,
  graphic,
  visibleCloser = true,
  initiallyOpen = false,
  className = '',
}) => {
  const { t } = useTranslation('LeporelloGraphicDetailsItem', translations);

  /* Prepare main and important object infos for usage */
  const inventor = graphic.involvedPersons.find(person => person.role === 'Inventor');

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';
  const subtitle = inventor ? inventor.name : ' ';
  const description = graphic.description || ' ';

  const {
    images,
    dating,
    dimensions,
    involvedPersons,
    inventoryNumber,
    inscription,
    signature,
    catalogWorkReferences,
    publications,
    classification,
    objectName,
  } = graphic;

  /* Sorting catalogWorkReferences */
  const sortingWeight = [
    {
      name: 'Bartsch',
      pos: 1,
    },
    {
      name: 'Hollstein',
      pos: 2,
    },
    {
      name: 'GND',
      pos: 3,
    },
  ];
  const getPatternPos = (str) => {
    const foundSortingWeight = sortingWeight.find(sw => str === sw.name);

    return foundSortingWeight ? foundSortingWeight.pos : Number.MAX_SAFE_INTEGER;
  };
  const sortedCatalogWorkReferences = catalogWorkReferences.sort(
    (a, b) => getPatternPos(b.description) - getPatternPos(a.description),
  );

  /* Map catalog work references */
  const catalogWorkReferenceItems = sortedCatalogWorkReferences.map(
    reference => ({
      term: t('{{catalogWorkReferenceName}}-No', { catalogWorkReferenceName: reference.description }),
      definition: reference.referenceNumber,
    }),
  );

  const [additionalClassNames, setAdditionalClassNames] = useState([]);
  const [involvedPersonsAreVisible, setInvolvedPersonsAreVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(!!initiallyOpen);

  /* React on isOpen change */
  useEffect(() => {
    setIsOpen(!!initiallyOpen);
  }, [initiallyOpen]);

  /* React on additional classnames change and open / close toggle */
  useEffect(() => {
    setAdditionalClassNames([
      ...className.split(' '),
      /*
        We add an extra classname, if the leporello item was opened,
        to be able to react to it on style level
      */
      ...(isOpen ? ['-is-open'] : []),
    ]);
  }, [className, isOpen]);

  return (
    <LeporelloGraphicItem
      className={`leporello-graphic-details-item-wrap ${additionalClassNames.join(' ')}`}
      data-component="organisms/leporello-graphic-details-item"
      initiallyOpen={isOpen}
      onToggle={setIsOpen}
      visibleToggler={visibleCloser}
    >
      <div className={`leporello-graphic-details-item ${additionalClassNames.join(' ')}`}>
        <div className={'leporello-graphic-details-item-image -is-non-fading'}>
          <Image
            src={images.sizes.l.src}
            alt={title}
            modifier=""
          />
        </div>

        <div className="leporello-graphic-details-item-info">
          <h1 className="title">{ title }</h1>
          <h2 className="subtitle inventor">
            { subtitle }

            <Toggler
              className="involved-persons-toggler"
              isInitiallyToggled={ involvedPersonsAreVisible }
              onToggle={ setInvolvedPersonsAreVisible }
              size="small"
            />
          </h2>

          {
            involvedPersonsAreVisible && <InvolvedPersonsTable data={ involvedPersons } />
          }

          <div className="further-infos">

            <DefinitionList>
              <DefinitionList.Entry
                term={ t('Classification') }
                definition={ `${classification.classification}, ${objectName}` }
              />
              <DefinitionList.Entry
                term={ t('Dating') }
                definition={ `${dating.dated} ${dating.remarks}` }
              />
              <DefinitionList.Entry
                term={ t('Measurments') }
                definition={dimensions}
              />
              { signature && <DefinitionList.Entry
                term={ t('Signature') }
                definition={signature}
              />
              }

              { inscription
                && <DefinitionList.Entry
                term={ t('Inscription') }
                definition={inscription}
              />
              }

              <DefinitionList.Entry
                term="CDA ID"
                definition={inventoryNumber}
              />
              <DefinitionList.Entry
                term={ t('Persistent Link') }
                definition={location}
              />
              {
                catalogWorkReferenceItems.map(
                  item => (
                    <DefinitionList.Entry
                      key={item.term}
                      term={item.term}
                      definition={item.definition}
                    />
                  ),
                )
              }

            </DefinitionList>

            {publications.length > 0
              && <DefinitionList>
              <DefinitionList.Entry
                term={ t('Literature') }
                definition={ <LiteratureTable data={ publications } /> }
              />
            </DefinitionList>
            }

            <CopyText
              text={description}
            />
          </div>
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
