import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import DefinitionList from '~/components/atoms/definition-list';
import LiteratureTable from '~/components/molecules/literature-table';
import CopyText from '~/components/atoms/copy-text';
import Image from '~/components/atoms/image';
import './leporello-graphic-details-item.scss';

export default ({
  graphic,
  initiallyOpen = false,
  className = '',
}) => {
  const { t } = useTranslation('LeporelloGraphicDetailsItem');

  /* Prepare main and important object infos for usage */
  const inventor = graphic.involvedPersons.find(person => person.role === 'Inventor');

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';
  const subtitle = inventor ? inventor.name : ' ';
  const description = graphic.description || ' ';

  const {
    images,
    dating,
    dimensions,
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

  /* Persistent link */
  const persistenLink = window.location.toString();

  const [additionalClassNames, setAdditionalClassNames] = useState([]);
  // const [imageColumnClassName, setImageColumnClassName] = useState('');
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

  /* React only on open / close toggle */
  /* useEffect(() => {
    setImageColumnClassName(isOpen ? 'is-half' : 'is-one-quarter-desktop');
  }, [isOpen]); */

  return (
    <LeporelloGraphicItem
      className={`leporello-graphic-details-item-wrap ${additionalClassNames.join(' ')}`}
      data-component="organisms/leporello-graphic-details-item"
      initiallyOpen={isOpen}
      onToggle={setIsOpen}
      visibleToggler={true}
    >
      <div className={`leporello-graphic-details-item ${additionalClassNames.join(' ')}`}>
        <div className={'leporello-graphic-details-item-image -is-non-fading'}>
          <Image
            src={images.sizes.l.src}
            alt={title}
            additionalClass=""

          ></Image>
        </div>

        <div className="leporello-graphic-details-item-info">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>

          <div className="leporello-graphic-details-item-info-further">
            <DefinitionList>
              <DefinitionList.Entry
                term={ t('Classification') }
                definition={ `${classification.classification}, ${objectName}` }
              />
              <DefinitionList.Entry
                term={ t('Dating') }
                definition={dating.dated}
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
                definition={persistenLink}
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

            <CopyText
              text={description}
            />

            <DefinitionList>
              <DefinitionList.Entry
                term={ t('Literature') }
                definition={ <LiteratureTable data={ publications } /> }
              />
            </DefinitionList>
          </div>
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
