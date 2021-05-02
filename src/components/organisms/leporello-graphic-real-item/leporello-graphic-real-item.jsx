import React from 'react';
import { useTranslation } from '~/i18n';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import ZoomImage from '~/components/atoms/zoom-image';
import GroupedDefinitionList from '~/components/atoms/grouped-definition-list';
import DefinitionList from '~/components/atoms/definition-list';
import LiteratureTable from '~/components/molecules/literature-table';
import RestorationSurveys from '~/components/molecules/restoration-surveys';

import translations from './translations.json';
import './leporello-graphic-real-item.scss';

export default ({
  graphic,
  visibleCloser = true,
  onClose = () => { },
}) => {
  const { t } = useTranslation('LeporelloGraphicRealItem', translations);

  const ART_TECH_EXAMINATION = 'ArtTechExamination';
  const CONDITION_REPORT = 'ConditionReport';
  const CONSERVATION_REPORT = 'ConservationReport';

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
    restorationSurveys,
    additionalTextInformation,
  } = graphic;

  const largestImageSrc = representativeImage.medium.src;
  const smallestImageSrc = representativeImage.small.src;

  const artTechExaminations = restorationSurveys.filter((rs) => rs.type === ART_TECH_EXAMINATION);
  const conditionReports = restorationSurveys.filter((rs) => rs.type === CONDITION_REPORT);
  const conservationReports = restorationSurveys.filter((rs) => rs.type === CONSERVATION_REPORT);

  const referenceToDefinitionListEntry = (reference) => ({
    term: t('{{catalogWorkReferenceName}}-No', { catalogWorkReferenceName: reference.description }),
    definition: reference.referenceNumber,
  });

  const catalogWorkReferenceItems = catalogWorkReferences.map(referenceToDefinitionListEntry);

  return (
    <LeporelloGraphicItem
      className="leporello-graphic-real-item-wrap"
      data-component="organisms/leporello-graphic-real-item"
      visibleCloser={visibleCloser}
      onClose={onClose}
    >
      <div className="leporello-graphic-real-item">
        <div className="leporello-graphic-real-item__image">
          <ZoomImage
            src={largestImageSrc}
            baseSrc={smallestImageSrc}
            alt={title}
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
            {catalogWorkReferenceItems.length > 0
              && catalogWorkReferenceItems.map((ref) => <GroupedDefinitionList.Entry
                key={ref.definition}
                term={ref.term}
                definition={ref.definition}
              />)}
          </GroupedDefinitionList>

          {/* Primärliteratur */}
          {publications.primary.length > 0
            && <DefinitionList>
              <DefinitionList.Entry
                term={t('Primary literature')}
                definition={<LiteratureTable forPrimary={true} items={publications.primary} />}
              />
            </DefinitionList>
          }

          {/* Sekundärliteratur */}
          {publications.secondary.length > 0
            && <DefinitionList>
              <DefinitionList.Entry
                term={t('Secondary literature')}
                definition={<LiteratureTable items={publications.secondary} />}
              />
            </DefinitionList>
          }

          {/* Forschungsgeschichte / Diskussion */}
          {additionalTextInformation.length > 0
            && <DefinitionList>
              <DefinitionList.Entry
                term={t('Interpretation / History / Discussion')}
                definition={
                  <ul class="additional-texts-list"> {
                    additionalTextInformation.map((info) => (<li
                      className="additional-texts-list-item"
                      key={info.text}
                    >
                      {info.text}
                    </li>))
                  }
                  </ul>
                }
              />
            </DefinitionList>
          }

          { (artTechExaminations.length + conditionReports.length + conservationReports.length) > 0
            && <GroupedDefinitionList>
                {/* Kunsttechnologische Untersuchung */}
                { artTechExaminations.length > 0
                  && <GroupedDefinitionList.Entry
                      term={t('Art-technological examination')}
                      definition={<RestorationSurveys items={artTechExaminations.reverse()} />}
                    />
                }

                {/* Erhaltungszustand */}
                { conditionReports.length > 0
                  && <GroupedDefinitionList.Entry
                    term={t('Condition')}
                    definition={<RestorationSurveys items={conditionReports.reverse()} />}
                  />}

                {/* Restaurierungsgeschichte */}
                { conservationReports.length > 0
                  && <DefinitionList.Entry
                      term={t('Conservation')}
                      definition={<RestorationSurveys items={conservationReports.reverse()} />}
                    />}

            </GroupedDefinitionList>
          }

        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
