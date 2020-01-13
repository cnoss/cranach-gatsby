// src/templates/page.js

import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';

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

  i18n(graphic.langCode);

  const { t } = useTranslation('VirtualObjectPage');

  const expectedReprintConditionLevelGroups = [
    {
      id: '1st-level',
      translations: {
        title: 'Reprints',
        subtitle: '1st state',
        description: '1st state description',
      },
      filter: reprintItem => reprintItem.ref && [0, 1].includes(reprintItem.ref.conditionLevel),
      items: [],
    },
    {
      id: '2nd-level',
      translations: {
        title: 'Reprints',
        subtitle: '2nd state',
        description: '2nd state description',
      },
      filter: reprintItem => reprintItem.ref && reprintItem.ref.conditionLevel === 2,
      items: [],
    },
    {
      id: '3rd-level',
      translations: {
        title: 'Reprints',
        subtitle: '3rd state',
        description: '3rd state description',
      },
      filter: reprintItem => reprintItem.ref && reprintItem.ref.conditionLevel === 3,
      items: [],
    },
  ];

  const reprintConditionLevelGroups = expectedReprintConditionLevelGroups.map(
    conditionLevelGroup => ({
      ...conditionLevelGroup,
      items: graphic.references.reprints.filter(
        conditionLevelGroup.filter,
      ),
      selectedReprintItem: null,
    }),
  ).filter(group => group.items.length > 0);

  const [reprintGroups, setReprintGroups] = useState(reprintConditionLevelGroups);
  const [selectedRelatedWorkItem, setSelectedRelatedWorkItem] = useState(null);

  const updateSelectedReprintItemForReprintGroup = (selectedReprintItem, groupIdx) => {
    const updatedReprintGroups = reprintGroups.map((reprintGroup, idx) => {
      if (idx === groupIdx) {
        return {
          ...reprintGroup,
          selectedReprintItem,
        };
      }

      return reprintGroup;
    });

    setReprintGroups(updatedReprintGroups);
  };

  return (
    <div
      className="page"
      data-template="page"
    >
      <Helmet>
        <title>Grafiken | {title} | Virtual</title>
      </Helmet>

      <Navigation
        goBackTo={`/${graphic.langCode}`}
      />

      <section className="body">
        <Leporello>
          <LeporelloGraphicDetailsItem graphic={graphic} />

          {
            reprintGroups.map((reprintGroup, idx) => {
              if (reprintGroup.selectedReprintItem) {
                return (
                  <LeporelloGraphicRealItem
                    key={`${reprintGroup.id}-real-item`}
                    graphic={reprintGroup.selectedReprintItem}
                    onClose={() => updateSelectedReprintItemForReprintGroup(null, idx)}
                  />
                );
              }

              return (<LeporelloGraphicReprintsItem
                key={`${reprintGroup.id}-reprint-item`}
                title={t(reprintGroup.translations.title)}
                subtitle={t(reprintGroup.translations.subtitle)}
                description={t(reprintGroup.translations.description)}
                reprints={reprintGroup.items}
                onItemClick={reprintItem => updateSelectedReprintItemForReprintGroup(
                  reprintItem,
                  idx,
                )}
              />);
            })
          }

          {graphic.references.relatedWorks.length > 0
            && (selectedRelatedWorkItem
              ? (
                <LeporelloGraphicRealItem
                  graphic={selectedRelatedWorkItem}
                  onClose={() => setSelectedRelatedWorkItem(null)}
                />
              )
              : (
                <LeporelloArtefactRelatedWorksItem
                  title={t('Related works')}
                  description={t('Related works description')}
                  relatedWorks={graphic.references.relatedWorks}
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
