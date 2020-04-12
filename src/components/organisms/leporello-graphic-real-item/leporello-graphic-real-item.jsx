import React from 'react';
import { useTranslation } from '~/i18n';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import ZoomImage from '~/components/atoms/zoom-image';
import GroupedDefinitionList from '~/components/atoms/grouped-definition-list';
import DefinitionList from '~/components/atoms/definition-list';
import LiteratureTable from '~/components/molecules/literature-table';
import CopyText from '~/components/atoms/copy-text';

import translations from './translations.json';
import './leporello-graphic-real-item.scss';

export default ({
  graphic,
  visibleCloser = true,
  onClose = () => {},
}) => {
  const { t } = useTranslation('LeporelloGraphicRealItem', translations);

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';
  const location = (graphic.locations[0] && graphic.locations[0].term) || '';
  const classification = `${graphic.classification.classification}; ${graphic.classification.condition}`;

  const {
    images,
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
  } = graphic;

  return (
    <LeporelloGraphicItem
      className="leporello-graphic-real-item-wrap"
      data-component="organisms/leporello-graphic-real-item"
      visibleCloser={visibleCloser}
      onClose={onClose}
    >
      <div className="leporello-graphic-real-item">
        <div className="leporello-graphic-real-image">
          <ZoomImage
            src={images.sizes.xl.src}
            baseSrc={images.sizes.s.src}
            alt={title}
          />
        </div>

        <div className="leporello-graphic-real-item-info">
          <GroupedDefinitionList>
            <GroupedDefinitionList.Entry
              term="CDA ID"
              definition={inventoryNumber}
            />
            <GroupedDefinitionList.Entry
              term={ t('Dating') }
              definition={dating.dated}
            />
          </GroupedDefinitionList>

          {/* Physikalische Eigenschaften */}
          <GroupedDefinitionList>
            <GroupedDefinitionList.Entry
              term={ t('Classification') }
              definition={classification}
            />
            <GroupedDefinitionList.Entry
              term={ t('Medium') }
              definition={<CopyText text={medium} />}
            />
            <GroupedDefinitionList.Entry
              term={ t('Measurments') }
              definition={<CopyText text={dimensions} />}
            />
          </GroupedDefinitionList>

          {/* Besitz, Eigentümer und so */}
          <GroupedDefinitionList>
            <GroupedDefinitionList.Entry
              term={ t('Owner') }
              definition={owner}
            />
            <GroupedDefinitionList.Entry
              term={ t('Repository') }
              definition={repository}
            />
            <GroupedDefinitionList.Entry
              term={ t('Location') }
              definition={location}
            />
          </GroupedDefinitionList>

          {/* Inschriften, Texte und so */}
         { (signature || inscription || markings || description || provenance)
            && (
              <GroupedDefinitionList>
                {signature && <GroupedDefinitionList.Entry
                  term={ t('Signature / Dating') }
                  definition={signature}
                />}
                {inscription && <GroupedDefinitionList.Entry
                  term={ t('Inscriptions') }
                  definition={<CopyText text={inscription} />}
                />}
                {markings && <GroupedDefinitionList.Entry
                  term={ t('Stamps, Seals, Labels') }
                  definition={markings}
                />}
                {description && <GroupedDefinitionList.Entry
                  term={ t('Short description') }
                  definition={description}
                />}
                {provenance && <GroupedDefinitionList.Entry
                  term={ t('Provenance') }
                  definition={<CopyText text={provenance} />}
                />}
              </GroupedDefinitionList>
            )
          }

          {publications.length > 0
            && <DefinitionList>
            <DefinitionList.Entry
              term={ t('Literature') }
              definition={ <LiteratureTable data={ publications } /> }
            />
          </DefinitionList>
        }
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
