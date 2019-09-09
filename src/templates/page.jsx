// src/templates/page.js

import React from 'react';
import Helmet from 'react-helmet';

import Navigation from '~/components/molecules/navigation';
import ZoomImage from '~/components/atoms/zoom-image';
import DefinitionList from '~/components/atoms/definition-list';


const PageTemplate = ({ pageContext }) => {
  const graphic = pageContext;

  const inventor = graphic.involvedPersons.find(person => person.role === 'Inventor');

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';
  const subtitle = inventor ? inventor.name : ' ';
  const description = graphic.description || ' ';

  const {
    classification,
    dating,
    dimensions,
    inventoryNumber,
    objectName,
  } = graphic;

  return (
    <div
      className="page"
    >
      <Helmet>
        <title>Grafiken | { title }</title>
      </Helmet>

      <Navigation />

      <div className="container">
        <div className="columns">
          <div className="column">
            <ZoomImage
              src={ graphic.image.xlarge }
              preloadSrc={ graphic.image.small }
              alt={ title }
            />
          </div>

          <div className="column">
            <h1 className="title">{ title }</h1>
            <h2 className="subtitle">{ subtitle }</h2>

            <div className="content">
              { description }
            </div>

            <div className="content">
              <DefinitionList>
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
                  term="Inventarnummer"
                  definition={ inventoryNumber }
                />

                <DefinitionList.Entry
                  term="Objektname"
                  definition={ objectName }
                />
              </DefinitionList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
