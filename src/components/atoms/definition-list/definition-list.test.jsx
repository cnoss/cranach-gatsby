
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import DefinitionList from '.';

describe('Atoms/DefinitionList', () => {
  let container;

  /* Element selectors */
  const listSelector = '.definition-list';
  const termSelector = '.term';
  const definitionSelector = '.definition';


  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders correctly', () => {
    act(() => {
      ReactDOM.render(<DefinitionList />, container);
    });

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

    act(() => {
      ReactDOM.render(
        <DefinitionList />,
        container,
      );
    });

    const firstTryListEl = container.querySelector(listSelector);

    const firstsTryTermEls = firstTryListEl.querySelectorAll(termSelector);
    const firstsTryDefinitionEls = firstTryListEl.querySelectorAll(definitionSelector);

    expect(firstsTryTermEls.length).toBe(0);
    expect(firstsTryDefinitionEls.length).toBe(0);

    act(() => {
      ReactDOM.render(
        <DefinitionList>
          { items }
        </DefinitionList>,
        container,
      );
    });

    const listEl = container.querySelector(listSelector);

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

    act(() => {
      ReactDOM.render(
        <DefinitionList>
          { items }
        </DefinitionList>,
        container,
      );
    });

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
