// src/templates/page.js

import React, { useState } from 'react';
import Helmet from 'react-helmet';

import Navigation from '~/components/molecules/navigation';
import Leporello from '~/components/atoms/leporello';
import LeporelloGraphicDetailsItem from '~/components/organisms/leporello-graphic-details-item';
import LeporelloGraphicReprintsItem from '~/components/organisms/leporello-graphic-reprints-item';
import LeporelloArtefactRelatedWorksItem from '~/components/organisms/leporello-artefact-related-works-item';
import LeporelloGraphicRealItem from '~/components/organisms/leporello-graphic-real-item';

import i18n from '~/i18n';


const PageTemplate = ({ pageContext }) => {
  const graphic = pageContext;
  const title = (graphic.titles[0] && graphic.titles[0].title) || '';
  const [selectedReprintItem, setSelectedReprintItem] = useState(null);
  const [selectedRelatedWorkItem, setSelectedRelatedWorkItem] = useState(null);

  i18n(graphic.langCode);

  const referenceGroups = graphic.references.reduce((acc, referenceItem) => {
    switch (referenceItem.text) {
      case 'Abzug A':
        acc.reprints.push(referenceItem);
        break;

      case 'Teil eines Werkes':
        acc.relatedWorks.push(referenceItem);
        break;

      default:
      /* Skip referenced item */
    }

    return acc;
  }, {
    reprints: [],
    relatedWorks: [],
  });

  return (
    <div
      className="page"
      data-template="page"
    >
      <Helmet>
        <title>Grafiken | {title} | Virtual</title>
      </Helmet>

      <Navigation
        goBack={true}
      />

      <section className="body">
        <Leporello>
          <LeporelloGraphicDetailsItem graphic={graphic} />

          {selectedReprintItem
            ? (
              <LeporelloGraphicRealItem
                graphic={selectedReprintItem}
                onClose={() => setSelectedReprintItem(null)}
              />
            )
            : (
              <LeporelloGraphicReprintsItem
                reprints={referenceGroups.reprints}
                onItemClick={setSelectedReprintItem}
              />
            )
          }

          {referenceGroups.relatedWorks.length > 0
            && (selectedRelatedWorkItem
              ? (
                <LeporelloGraphicRealItem
                  graphic={selectedRelatedWorkItem}
                  onClose={() => setSelectedRelatedWorkItem(null)}
                />
              )
              : (
                <LeporelloArtefactRelatedWorksItem
                  relatedWorks={referenceGroups.relatedWorks}
                  onItemClick={setSelectedRelatedWorkItem}
                />
              )
            )
          }
        </Leporello>
      </section>
    </div>
  );
};

export default PageTemplate;
