import React from 'react';
import { useTranslation } from '~/i18n';

import CopyText from '~/components/atoms/copy-text';
import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import ZoomImage from '~/components/atoms/zoom-image';
import GroupedDefinitionList from '~/components/atoms/grouped-definition-list';
import DefinitionList from '~/components/atoms/definition-list';
import LiteratureTable from '~/components/molecules/literature-table';

import translations from './translations.json';
import './leporello-graphic-real-item.scss';

export default ({
  graphic,
  visibleCloser = true,
  onClose = () => { },
}) => {
  const { t } = useTranslation('LeporelloGraphicRealItem', translations);

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
  } = graphic;

  const largestImageSrc = representativeImage.xl.src;
  const smallestImageSrc = representativeImage.s.src;

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
            {catalogWorkReferences.length > 0
              && catalogWorkReferences.map(ref => <GroupedDefinitionList.Entry
                key={ref.referenceNumber}
                term={ref.description}
                definition={ref.referenceNumber}
              />)}
          </GroupedDefinitionList>

          {/* Publikationen */}
          {publications.length > 0
            && <DefinitionList>
              <DefinitionList.Entry
                term={t('Literature')}
                definition={<LiteratureTable data={publications} />}
              />
            </DefinitionList>
          }

          { /* Restaurationsdokument */ }
          <h3 className="leporello-graphic-real-item__subheading">Restaurationsdokument</h3>

          { restorationSurveys.map((survey, surveyIdx) => (<section key={surveyIdx} className="survey">
            <h4 className="leporello-graphic-real-item__survey-title">{ survey.type }</h4>

            <div className="leporello-graphic-real-item__survey">
              {(!!survey.project
                || !!survey.overallAnalysis
                || !!survey.remarks
                || !!survey.involvedPersons.length > 0
                || !!survey.processingDates)
                && <GroupedDefinitionList>
                {!!survey.project && <GroupedDefinitionList.Entry
                  term="Projekt"
                  definition={survey.project}
                />}
                {!!survey.overallAnalysis && <GroupedDefinitionList.Entry
                  term="Analyse"
                  definition={<CopyText text={survey.overallAnalysis} />}
                />}
                {!!survey.remarks && <GroupedDefinitionList.Entry
                  term="Bemerkungen"
                  definition={<CopyText text={survey.remarks} />}
                />}
                {!!survey.involvedPersons.length > 0 && <GroupedDefinitionList.Entry
                  term="Involvierte Personen"
                  definition={survey.involvedPersons.map((involvedPerson, involvedPersonIdx) => (
                    <p key={involvedPersonIdx}>
                   { involvedPerson.name } ({involvedPerson.role})
                  </p>))}
                />}
                {!!survey.processingDates && <GroupedDefinitionList.Entry
                  term="Datum"
                  definition={`${survey.processingDates.beginDate}${survey.processingDates.endDate.length !== 0 && survey.processingDates.endDate !== survey.processingDates.beginDate
                    ? ` - ${survey.processingDates.endDate}`
                    : ''}`}
                />}
              </GroupedDefinitionList>}

              {survey.tests.length > 0 && <div className="leporello-graphic-real-item__survey-tests">
                <h5 className="leporello-graphic-real-item__survey-tests-title">Tests</h5>
                {survey.tests.map((test, testIdx) => (<div key={testIdx} className="leporello-graphic-real-item__survey-test">
                    { (test.kind || test.purpose || test.text || test.remarks)
                      && <GroupedDefinitionList>
                      {test.kind && <GroupedDefinitionList.Entry
                        term="Art"
                        definition={test.kind}
                      />}
                      {test.purpose && <GroupedDefinitionList.Entry
                        term="Zweck"
                        definition={<CopyText text={test.purpose} />}
                      />}
                      {test.text && <GroupedDefinitionList.Entry
                        term="Text"
                        definition={<CopyText text={test.text} />}
                      />}
                      {test.remarks && <GroupedDefinitionList.Entry
                        term="Bemerkungen"
                        definition={<CopyText text={test.remarks} />}
                      />}
                    </GroupedDefinitionList>}
                  </div>))}
                </div>}
            </div>
          </section>)) }
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
