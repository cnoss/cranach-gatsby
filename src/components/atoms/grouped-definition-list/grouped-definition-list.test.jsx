
import React from 'react';
import { render } from '@testing-library/react';

import DefinitionList from '.';

describe('Atoms/DefinitionList', () => {
  /* Element selectors */
  const listSelector = '[data-component="atoms/definition-list"]';
  const termSelector = '.term';
  const definitionSelector = '.definition';

  it('renders correctly', () => {
    const { container } = render(
      <DefinitionList/>,
    );

    expect(!!container.querySelector(listSelector)).toBe(true);
  });

  it('renders correct number of terms and definitions', () => {
    const rawItems = [
      {
        term: 'First Term-Text',
        definition: 'First Definition-Text',
      },
      {
        term: 'Second Term-Text',
        definition: 'Second Definition-Text',
      },
      {
        term: 'Third Term-Text',
        definition: 'Third Definition-Text',
      },
    ];

    const items = rawItems.map((rawItem, idx) => (
      <DefinitionList.Entry
        key={ idx }
        term={ rawItem.term }
        definition={ rawItem.definition }
      />
    ));

    const firstRender = render(
      <DefinitionList/>,
    );

    const firstTryListEl = firstRender.container.querySelector(listSelector);

    const firstsTryTermEls = firstTryListEl.querySelectorAll(termSelector);
    const firstsTryDefinitionEls = firstTryListEl.querySelectorAll(definitionSelector);

    expect(firstsTryTermEls.length).toBe(0);
    expect(firstsTryDefinitionEls.length).toBe(0);

    const secondRender = render(
      <DefinitionList>
        { items }
      </DefinitionList>,
    );

    const listEl = secondRender.container.querySelector(listSelector);

    const termEls = listEl.querySelectorAll(termSelector);
    const definitionEls = listEl.querySelectorAll(definitionSelector);

    expect(termEls.length).toBe(items.length);
    expect(definitionEls.length).toBe(items.length);
  });

  it('renders correct terms and definitions in correct order', () => {
    const rawItems = [
      {
        term: 'First Term-Text',
        definition: 'First Definition-Text',
      },
      {
        term: 'Second Term-Text',
        definition: 'Second Definition-Text',
      },
      {
        term: 'Third Term-Text',
        definition: 'Third Definition-Text',
      },
    ];

    const items = rawItems.map((rawItem, idx) => (
      <DefinitionList.Entry
        key={ idx }
        term={ rawItem.term }
        definition={ rawItem.definition }
      />
    ));

    const { container } = render(
      <DefinitionList>
        { items }
      </DefinitionList>,
    );

    const listEl = container.querySelector(listSelector);

    const termEls = listEl.querySelectorAll(termSelector);
    const definitionEls = listEl.querySelectorAll(definitionSelector);

    const zippedElPairs = Array.from(termEls).map((termEl, idx) => [termEl, definitionEls[idx]]);

    zippedElPairs.forEach((zippedElPair, idx) => {
      expect(zippedElPair[0].textContent).toBe(rawItems[idx].term);
      expect(zippedElPair[1].textContent).toBe(rawItems[idx].definition);
    });
  });
});
