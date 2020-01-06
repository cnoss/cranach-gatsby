import React from 'react';
import { useTranslation } from 'react-i18next';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import ZoomImage from '~/components/atoms/zoom-image';
import GroupedDefinitionList from '~/components/atoms/grouped-definition-list';

import './leporello-graphic-real-item.scss';

export default ({
  graphic,
}) => {
  const { t } = useTranslation('LeporelloGraphicRealItem');

  /* Prepare main and important object infos for usage */
  // const inventor = graphic.involvedPersons.find(person => person.role === 'Inventor');

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';
  const location = (graphic.locations[0] && graphic.locations[0].term) || '';
  // const description = graphic.description || ' ';
  const classification = `${graphic.classification.classification}; ${graphic.classification.condition}`;

  // const signature = (graphic.signature && graphic.signature) || '';

  const {
    image,
    dating,
    dimensions,
    inventoryNumber,
    objectName,
    catalogWorkReferences,
    medium,
    owner,
    repository,
    signature,
    inscription,
    markings,
    description,
    provenance,
  } = graphic;

  /* Map catalog work references */
  const catalogWorkReferenceItems = catalogWorkReferences.map(
    reference => ({
      term: t('{{catalogWorkReferenceName}}-No', { catalogWorkReferenceName: reference.description }),
      definition: reference.referenceNumber,
    }),
  );


  return (
    <LeporelloGraphicItem
      className="leporello-graphic-real-item-wrap"
      data-component="organisms/leporello-graphic-real-item"
      visibleToggler={false}
    >
      <div className="leporello-graphic-real-item">
        <div className="leporello-graphic-real-image">
          <ZoomImage
            src={image.xlarge}
            baseSrc={image.small}
            alt={title}
          />
        </div>

        <div className="leporello-graphic-real-item-info">
          <GroupedDefinitionList>
            <GroupedDefinitionList.Entry
              term="CDA ID"
              definition={inventoryNumber}
            />
            {
              catalogWorkReferenceItems.map(
                item => (
                  <GroupedDefinitionList.Entry
                    key={item.term}
                    term={item.term}
                    definition={item.definition}
                  />
                ),
              )
            }
            <GroupedDefinitionList.Entry
              term={ t('Dating') }
              definition={dating.dated}
            />
          </GroupedDefinitionList>

          {/* Physikalische Eigenschaften */}
          <GroupedDefinitionList>
            <GroupedDefinitionList.Entry
              term={ t('Objectname') }
              definition={objectName}
            />
            <GroupedDefinitionList.Entry
              term={ t('Classification') }
              definition={classification}
            />
            <GroupedDefinitionList.Entry
              term={ t('Medium') }
              definition={medium}
            />
            <GroupedDefinitionList.Entry
              term={ t('Measurments') }
              definition={dimensions}
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
          <GroupedDefinitionList>
            {signature && <GroupedDefinitionList.Entry
              term={ t('Signature / Dating') }
              definition={signature}
            />}
            {inscription && <GroupedDefinitionList.Entry
              term={ t('Inscriptions') }
              definition={inscription}
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
              definition={provenance}
            />}
          </GroupedDefinitionList>
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
