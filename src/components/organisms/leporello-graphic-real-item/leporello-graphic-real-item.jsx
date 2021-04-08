import React from 'react';
import { useTranslation } from '~/i18n';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';

import Viewer from '~/components/playground/viewer';
import GroupedDefinitionList from '~/components/atoms/grouped-definition-list';
import DefinitionList from '~/components/atoms/definition-list';
import LiteratureTable from '~/components/molecules/literature-table';

import translations from './translations.json';
import './leporello-graphic-real-item.scss';

export default ({
  graphic,
  visibleCloser = true,
  onClose = () => { },
}) => {
  const { t } = useTranslation('LeporelloGraphicRealItem', translations);

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';
  const location = (graphic.locations[0] && graphic.locations[0].term) || '';
  const condition = `${graphic.classification.classification}; ${graphic.classification.condition}`;

  const {
    representativeImage,
    dating,
    dimensions,
    inventoryNumber,
    medium,
    owner,
    repository,
    signature,
    inscription,
    markings,
    description,
    provenance,
    publications,
    exhibitionHistory,
    catalogWorkReferences,
  } = graphic;

  return (
    <LeporelloGraphicItem
      className="leporello-graphic-real-item-wrap"
      data-component="organisms/leporello-graphic-real-item"
      visibleCloser={visibleCloser}
      onClose={onClose}
    >
      <div className="leporello-graphic-real-item">
        <div className="leporello-graphic-real-item__image">
          <Viewer
            inventoryNumber={inventoryNumber}
            artefactType='graphics'
            placeholder={representativeImage}
          />
        </div>

        <div className="leporello-graphic-real-item__info">

          <h2 className="leporello-graphic-real-item__title">{title}, {dating.dated}</h2>

          {/* Physikalische Eigenschaften */}
          <GroupedDefinitionList>
            <GroupedDefinitionList.Entry
              term={t('Condition')}
              definition={condition}
            />
            <GroupedDefinitionList.Entry
              term={t('Medium')}
              definition={medium}
            />
            <GroupedDefinitionList.Entry
              term={t('Dimensions')}
              definition={dimensions}
            />
          </GroupedDefinitionList>

          {/* Besitz, Eigentümer und so */}
          <GroupedDefinitionList>
            <GroupedDefinitionList.Entry
              term={t('Owner')}
              definition={owner}
            />
            <GroupedDefinitionList.Entry
              term={t('Repository')}
              definition={repository}
            />
            <GroupedDefinitionList.Entry
              term={t('Location')}
              definition={location}
            />
          </GroupedDefinitionList>

          {/* Inschriften, Texte und so */}
          {(signature || inscription || markings)
            && (
              <GroupedDefinitionList>
                {signature && <GroupedDefinitionList.Entry
                  term={t('Signature / Dating')}
                  definition={signature}
                />}
                {inscription && <GroupedDefinitionList.Entry
                  term={t('Inscriptions')}
                  definition={inscription}
                />}
                {markings && <GroupedDefinitionList.Entry
                  term={t('Stamps, Seals, Labels')}
                  definition={markings}
                />}
              </GroupedDefinitionList>
            )
          }

          {/* Beschreibung, Provenienz, Ausstellungen */}
          {(provenance || exhibitionHistory || description)
            && (
              <GroupedDefinitionList>
                {description && <GroupedDefinitionList.Entry
                  term={t('Short description')}
                  definition={description}
                />}
                {provenance && <GroupedDefinitionList.Entry
                  term={t('Provenance')}
                  definition={provenance}
                />}
                {exhibitionHistory && <GroupedDefinitionList.Entry
                  term={t('Exhibitions')}
                  definition={exhibitionHistory}
                />}
              </GroupedDefinitionList>
            )
          }

          {/* Kennungen */}
          <GroupedDefinitionList>
            <GroupedDefinitionList.Entry
              term="CDA ID"
              definition={inventoryNumber}
            />
            {catalogWorkReferences.length > 0
              && catalogWorkReferences.map((ref) => <GroupedDefinitionList.Entry
                term={ref.description}
                definition={ref.referenceNumber}
              />)}
          </GroupedDefinitionList>

          {/* Publikationen */}
          {publications.length > 0
            && <DefinitionList>
              <DefinitionList.Entry
                term={t('Literature')}
                definition={<LiteratureTable data={publications} />}
              />
            </DefinitionList>
          }
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
