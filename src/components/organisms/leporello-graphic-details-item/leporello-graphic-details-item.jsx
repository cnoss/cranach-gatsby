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
    additionalTextInformation,
  } = graphic;

  const referenceToDefinitionListEntry = (reference) => ({
    term: t('{{catalogWorkReferenceName}}-No', { catalogWorkReferenceName: reference.description }),
    definition: reference.referenceNumber,
  });

  const catalogWorkReferenceItems = catalogWorkReferences.map(referenceToDefinitionListEntry);

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

  const repImageSrc = representativeImage.sizes.medium.src;

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
              src={repImageSrc}
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
                    definition={
                      <ul className="historic-event-dates-list">
                        <li className="historic-event-dates-list-item">{`${dating.dated} ${dating.remarks}`}</li>
                        {
                          dating.historicEventInformations.map((eventInfo, idx) => (
                            <li className="historic-event-dates-list-item" key={idx}>{`${eventInfo.text} ${eventInfo.remarks}`}</li>
                          ))
                        }
                      </ul>
                    }
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

                {/* Primärliteratur */}
                {publications.primary.length > 0
                  && <DefinitionList>
                    <DefinitionList.Entry
                      term={t('Primary literature')}
                      definition={<LiteratureTable
                        forPrimary={true}
                        items={publications.primary}
                      />}
                    />
                  </DefinitionList>
                }

                {/* Sekundärliteratur */}
                {publications.secondary.length > 0
                  && <DefinitionList>
                    <DefinitionList.Entry
                      term={t('Secondary literature')}
                      definition={<LiteratureTable items={publications.secondary} />}
                    />
                  </DefinitionList>
                }

                {/* Forschungsgeschichte / Diskussion */}
                {additionalTextInformation.length > 0
                  && <DefinitionList>
                    <DefinitionList.Entry
                      term={t('Interpretation / History / Discussion')}
                      definition={
                        <ul class="additional-texts-list"> {
                          additionalTextInformation.map((info) => (<li
                            className="additional-texts-list-item"
                            key={info.text}
                          >
                            {info.text}
                          </li>))
                        }
                        </ul>
                      }
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
