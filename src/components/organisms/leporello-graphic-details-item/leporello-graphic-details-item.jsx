import React, { useState, useEffect } from 'react';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import ZoomImage from '~/components/atoms/zoom-image';
import DefinitionList from '~/components/atoms/definition-list';
import CopyText from '~/components/atoms/copy-text';

import './leporello-graphic-details-item.scss';

export default ({
  graphic,
  initiallyOpen = false,
  className = '',
}) => {
  /* Prepare main and important object infos for usage */
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

  /* Map catalog work references */
  const catalogWorkReferenceItems = catalogWorkReferences.map(
    reference => ({
      term: `${reference.description}-Nr.`,
      definition: reference.referenceNumber,
    }),
  );

  const [additionalClassNames, setAdditionalClassNames] = useState([]);
  const [imageColumnClassName, setImageColumnClassName] = useState('');
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
      ...(isOpen ? ['-details-is-open'] : []),
    ]);
  }, [className, isOpen]);

  /* React only on open / close toggle */
  useEffect(() => {
    setImageColumnClassName(isOpen ? 'is-half' : 'is-one-quarter-desktop');
  }, [isOpen]);

  return (
    <LeporelloGraphicItem
      className={ `leporello-graphic-details-item ${additionalClassNames.join(' ')}` }
      data-component="organisms/leporello-graphic-details-item"
      initiallyOpen={ isOpen }
      onToggle={ setIsOpen }
    >

        <div className={ `details-image ${imageColumnClassName} -is-non-fading` }>
          <ZoomImage
            src={ image.xlarge }
            baseSrc={ image.small }
            alt={ title }
          />
        </div>

        <div className="details-info">
          <h1 className="title">{ title }</h1>
          <h2 className="subtitle">{ subtitle }</h2>

          <div className="details-further-info">
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
            <CopyText
              text={ description }
            />
          </div>
        </div>

    </LeporelloGraphicItem>
  );
};
