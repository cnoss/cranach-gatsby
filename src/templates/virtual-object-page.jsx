/* src/templates/virtual-object-page.js */

import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import Navigation from '~/components/molecules/navigation';
import Leporello from '~/components/atoms/leporello';
import LeporelloGraphicDetailsItem from '~/components/organisms/leporello-graphic-details-item';
import LeporelloGraphicReprintsItem from '~/components/organisms/leporello-graphic-reprints-item';
import LeporelloArtefactRelatedWorksItem from '~/components/organisms/leporello-artefact-related-works-item';
import LeporelloGraphicRealItem from '~/components/organisms/leporello-graphic-real-item';

import i18n from '~/i18n';

const PageTemplate = ({ pageContext, location, navigate }) => {
  const graphic = pageContext;
  const title = (graphic.titles[0] && graphic.titles[0].title) || '';

  i18n(graphic.metadata.langCode);

  const [selectedReprintItem, setSelectedReprintItem] = useState(null);

  const { hash } = location;
  const { reprints } = graphic.references;

  useEffect(() => {
    if (hash.length === 0) {
      return;
    }

    const selectedReprintInventoryNumber = hash.slice(1);
    const matchingReprint = reprints.find(
      (reprint) => reprint.inventoryNumber === selectedReprintInventoryNumber,
    );

    if (matchingReprint) {
      setSelectedReprintItem(matchingReprint.ref);
    }
  }, [hash, reprints]);

  useEffect(() => {
    if (selectedReprintItem && location.hash.length > 1) {
      const activeReprintElement = document.querySelector(location.hash);

      if (!activeReprintElement) return;

      setTimeout(() => {
        activeReprintElement.scrollIntoView();
      }, 0);
    }
  }, [selectedReprintItem, location]);

  const reprintItemSelector = (reprintRef) => {
    setSelectedReprintItem(reprintRef);

    if (reprintRef) {
      navigate(`${location.pathname}#${reprintRef.inventoryNumber}`, { replace: true });
    } else {
      navigate(`${location.pathname}`, { replace: true });
    }
  };

  const queryParams = location.search.slice(1).split('&').reduce((acc, param) => {
    const [name, value] = param.split('=');

    acc[name] = decodeURIComponent(value);

    return acc;
  }, {});

  const goBackTo = queryParams.back || `/${graphic.metadata.langCode}`;

  return (
    <div
      className="template"
      data-template="virtual-object-page"
    >
      <Helmet>
        <title>Grafiken | {title} | Virtual</title>
      </Helmet>

      <Navigation
        goBackTo={goBackTo}
      />

      <section className="body">
        <Leporello>
          <LeporelloGraphicDetailsItem graphic={graphic} location={location.href} />
          {selectedReprintItem
            ? (
              <LeporelloGraphicRealItem
                graphic={selectedReprintItem}
                onClose={() => reprintItemSelector(null)}
              />
            )
            : (
              <LeporelloGraphicReprintsItem
                reprints={graphic.references.reprints}
                onItemClick={reprintItemSelector}
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

export default PageTemplate;
