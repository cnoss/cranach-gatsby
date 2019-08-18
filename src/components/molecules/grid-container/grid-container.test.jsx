
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import GridContainer from './grid-container';

describe('GridContainer', () => {
  let container;

  /* Element selectors */
  const gridContainerSelector = '.grid-container';

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
      ReactDOM.render(
        <GridContainer/>,
        container,
      );
    });

    expect(!!container.querySelector(gridContainerSelector)).toBe(true);
  });
});
