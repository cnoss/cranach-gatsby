import React, { useState } from 'react';

import CopyText from '~/components/atoms/copy-text';
import Toggler from '~/components/atoms/toggler';

import './restoration-surveys.scss';

export default ({ items }) => {
  const [itemsOpenState, setItemsOpenState] = useState(
    items.map(() => false),
  );

  const determineDate = (processingDates) => {
    let date = '';

    if (!processingDates) {
      return date;
    }

    const { beginDate, endDate } = processingDates;

    if (beginDate) {
      date = beginDate;
    }

    if (endDate && endDate !== beginDate) {
      date = `${date} - ${endDate}`;
    }

    return date;
  };

  const surveyPurpose = (survey) => ((survey.tests.length > 0)
    ? (<p className="purpose">{ survey.tests[0].purpose }</p>)
    : '');

  const distinctSurveyKeywords = (survey) => Object.values(survey.tests.reduce((acc, test) => {
    test.keywords.forEach((keyword) => {
      if (!acc[keyword.name]) {
        acc[keyword.name] = keyword;
      }
    });

    return acc;
  }, {}));

  const surveyKeywords = (survey) => {
    const keywords = distinctSurveyKeywords(survey);

    return keywords.length > 0 ? (<ul className="keywords">
      {keywords.map((keyword, keywordKey) => (<li className="keywords__item" key={keywordKey}>{ keyword.name }</li>))}
    </ul>) : '';
  };

  const toggleSurveyIsOpen = (idx) => {
    setItemsOpenState(itemsOpenState.map((openState, i) => (i === idx ? !openState : openState)));
  };

  const surveyHasBody = (item) => (item.tests.length + item.involvedPersons.length) > 0;

  return (<div
    className="restoration-surveys"
    data-component="molecules/restoration-surveys"
  >
    { items.map((item, itemKey) => (<div className="survey" key={itemKey}>
      <p className="date">Datum: <span className="date__value">{determineDate(item.processingDates)}</span></p>
      {/* Purpose */}
      { surveyPurpose(item) }

      {/* Keywords */}
      { surveyKeywords(item) }

      {/* Files: should be added to graphql query in gatsby-node.js and outputted here */}
      <div className="files">
        <div className="files__item"></div>
        <div className="files__item"></div>
        <div className="files__item"></div>
      </div>

      { surveyHasBody(item) && itemsOpenState[itemKey]
        && <div className="survey__body">

          {/* Tests */}
          { item.tests.map((test, testKey) => (<div className="survey__test" key={testKey}>
            <p className="test__kind">{ test.kind }</p>
            <div className="test__text">
              <CopyText text={test.text} />
            </div>
          </div>))}

          {/* Involvierte Personen */}
          { item.involvedPersons.length > 0
            && <ul className="involved-persons">
              {
                item.involvedPersons.map(
                  (involvedPerson, involvedPersonKey) => (
                    <li key={involvedPersonKey}>{involvedPerson.role}: {involvedPerson.name}</li>
                  ),
                )
              }
            </ul>
          }

        </div>
      }

      { surveyHasBody(item)
        && <div className="survey__collapser">
          <div className="collapser__spacer"></div>
          <Toggler
            className="collapser__button"
            isInitallyToggled={itemsOpenState[itemKey]}
            onToggle={() => toggleSurveyIsOpen(itemKey)}
          />
        </div>
      }
    </div>)) }
  </div>);
};
