import React, { useState, useEffect } from 'react';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import ZoomImage from '~/components/atoms/zoom-image';
import DefinitionList from '~/components/atoms/definition-list';

import './leporello-graphic-details-item.scss';

export default ({
  graphic,
  className = '',
}) => {
  const inventor = graphic.involvedPersons.find(person => person.role === 'Inventor');

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';
  const subtitle = inventor ? inventor.name : ' ';
  const description = graphic.description || ' ';

  const {
    image,
    classification,
    dating,
    dimensions,
    inventoryNumber,
    objectName,
    catalogWorkReferences,
  } = graphic;

  const catalogWorkReferenceItems = catalogWorkReferences.map(
    reference => ({
      term: `${reference.description}-Nr.`,
      definition: reference.referenceNumber,
    }),
  );

  const [additionalClassNames, setAdditionalClassNames] = useState([]);

  useEffect(() => {
    setAdditionalClassNames(
      [
        ...className.split(' '),
      ],
    );
  }, [className]);

  return (
    <LeporelloGraphicItem
      className={ `leporello-graphic-details-item ${additionalClassNames.join(' ')}` }
      data-component="organisms/leporello-graphic-details-item"
    >
      <div className="columns">
        <div className="column is-one-quarter-desktop -is-non-fading">
          <ZoomImage
            src={ image.xlarge }
            baseSrc={ image.small }
            alt={ title }
          />
        </div>

        <div className="column is-half">
          <h1 className="title">{ title }</h1>
          <h2 className="subtitle">{ subtitle }</h2>

          <div className="content">
            <DefinitionList>

              <DefinitionList.Entry
                term="CDA ID"
                definition={ inventoryNumber }
              />

              {
                catalogWorkReferenceItems.map(
                  item => (
                    <DefinitionList.Entry
                      key={ item.term }
                      term={ item.term }
                      definition={ item.definition }
                    />
                  ),
                )
              }

              <DefinitionList.Entry
                term="Klassifikation"
                definition={ classification.classification }
              />

              <DefinitionList.Entry
                term="Datiert"
                definition={ dating.dated }
              />

              <DefinitionList.Entry
                term="Maße"
                definition={ dimensions }
              />

              <DefinitionList.Entry
                term="Objektname"
                definition={ objectName }
              />
            </DefinitionList>
          </div>

          <div className="content" dangerouslySetInnerHTML={ { __html: description } }>
          </div>
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
