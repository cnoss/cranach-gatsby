/* src/templates/virtual-object-page.js */

import React, { useState, useContext } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react-lite';

import Navigation from '~/components/molecules/navigation';
import Leporello from '~/components/atoms/leporello';
import LeporelloGraphicDetailsItem from '~/components/organisms/leporello-graphic-details-item';
import LeporelloGraphicReprintsItem from '~/components/organisms/leporello-graphic-reprints-item';
import LeporelloArtefactRelatedWorksItem from '~/components/organisms/leporello-artefact-related-works-item';
import LeporelloGraphicRealItem from '~/components/organisms/leporello-graphic-real-item';

import StoreContext from '~/store/StoreContext';

const PageTemplate = ({ pageContext, location }) => {
  const { ui } = useContext(StoreContext);
  const graphic = pageContext;
  const title = (graphic.titles[0] && graphic.titles[0].title) || '';

  const [selectedReprintItem, setSelectedReprintItem] = useState(null);

  ui.setLanguage(graphic.langCode);

  return (
    <div
      className="template"
      data-template="virtual-object-page"
    >
      <Helmet>
        <title>Grafiken | {title} | Virtual</title>
      </Helmet>

      <Navigation
        goBackTo={`/${graphic.langCode}`}
      />

      <section className="body">
        <Leporello>
          <LeporelloGraphicDetailsItem graphic={graphic} location={location.href} />
          {selectedReprintItem
            ? (
              <LeporelloGraphicRealItem
                graphic={selectedReprintItem}
                onClose={() => setSelectedReprintItem(null)}
              />
            )
            : (
              <LeporelloGraphicReprintsItem
                reprints={graphic.references.reprints}
                onItemClick={setSelectedReprintItem}
              />
            )
          }

          {graphic.references.relatedWorks.length > 0
            && (
              <LeporelloArtefactRelatedWorksItem
                relatedWorks={graphic.references.relatedWorks}
              />
            )
          }
        </Leporello>
      </section>
    </div>
  );
};

export default observer(PageTemplate);
