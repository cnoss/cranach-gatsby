import React, { useState, useEffect } from 'react';
import { useTranslation } from '~/i18n';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import DefinitionList from '~/components/atoms/definition-list';
import InvolvedPersonsList from '~/components/molecules/involved-persons-list';
import LiteratureTable from '~/components/molecules/literature-table';
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
  // const inventor = graphic.involvedPersons.find(person => person.role === 'Inventor');

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';
  // const subtitle = inventor ? inventor.name : ' ';
  const description = graphic.description || ' ';

  const {
    representativeImage,
    dating,
    dimensions,
    involvedPersons,
    inventoryNumber,
    signature,
    catalogWorkReferences,
    publications,
    classification,
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
    const foundSortingWeight = sortingWeight.find((sw) => str === sw.name);

    return foundSortingWeight ? foundSortingWeight.pos : Number.MAX_SAFE_INTEGER;
  };
  const sortedCatalogWorkReferences = catalogWorkReferences.sort(
    (a, b) => getPatternPos(b.description) - getPatternPos(a.description),
  );

  /* Map catalog work references */
  const catalogWorkReferenceItems = sortedCatalogWorkReferences.map(
    (reference) => ({
      term: t('{{catalogWorkReferenceName}}-No', { catalogWorkReferenceName: reference.description }),
      definition: reference.referenceNumber,
    }),
  );

  const [additionalClassNames, setAdditionalClassNames] = useState([]);
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

  const largestImageSrc = representativeImage.l.src;

  const primaryLiterature = publications.filter(
    (publication) => publication.ref.isPrimarySource,
  );
  const secondaryLiterature = publications.filter(
    (publication) => !publication.ref.isPrimarySource,
  );

  return (
    <LeporelloGraphicItem
      className={`leporello-graphic-details-item-wrap ${additionalClassNames.join(' ')}`}
      data-component="organisms/leporello-graphic-details-item"
      initiallyOpen={isOpen}
      onToggle={setIsOpen}
      visibleToggler={visibleCloser}
      closerType="with-cover"
    >
      <div className={`leporello-graphic-details-item ${additionalClassNames.join(' ')}`}>
        <header className="leporello-graphic-details-item__header">
          <h2 className="chapter">{t('Master Data')}</h2>
        </header>

        <div className="leporello-graphic-details-item__content">
          <div className={'leporello-graphic-details-item__content-image'}>
            <Image
              src={largestImageSrc}
              alt={title}
            />
          </div>
          <div className="leporello-graphic-details-item__content-info">
            <header className="leporello-graphic-details-item__content-info-header">
              <h1 className="title">{title}</h1>
              <h2 className="subtitle">
                {classification.classification}, {classification.printProcess}
              </h2>
            </header>
            <div className="leporello-graphic-details-item__content-info-content">
              <div className="column">
                <CopyText
                  text={description}
                />
              </div>

              <div className="column">
                <DefinitionList>
                  <DefinitionList.Entry
                    term={t('Attribution')}
                    definition={<InvolvedPersonsList data={involvedPersons} />}
                  />
                  <DefinitionList.Entry
                    term={t('Production date')}
                    definition={`${dating.dated} ${dating.remarks}`}
                  />

                  <DefinitionList.Entry
                    term={t('Dimensions')}
                    definition={dimensions}
                  />
                  {signature && <DefinitionList.Entry
                    term={t('Signature')}
                    definition={signature}
                  />
                  }

                  {
                    catalogWorkReferenceItems.map(
                      (item) => (
                        <DefinitionList.Entry
                          key={item.term}
                          term={item.term}
                          definition={item.definition}
                        />
                      ),
                    )
                  }

                  <DefinitionList.Entry
                    term="CDA ID"
                    definition={inventoryNumber}
                  />
                  <DefinitionList.Entry
                    term={t('Persistent Link')}
                    definition={location}
                  />

                </DefinitionList>

                {primaryLiterature.length > 0
                  && <DefinitionList>
                    <DefinitionList.Entry
                      term={t('Primary literature')}
                      definition={<LiteratureTable data={primaryLiterature} />}
                    />
                  </DefinitionList>
                }

                {secondaryLiterature.length > 0
                  && <DefinitionList>
                    <DefinitionList.Entry
                      term={t('Literature')}
                      definition={<LiteratureTable data={secondaryLiterature} />}
                    />
                  </DefinitionList>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
