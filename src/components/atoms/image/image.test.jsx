
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Image from './image';

describe('Atoms/Image', () => {
  let container;

  /* Element selectors */
  const imageSelector = '.image';

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
      ReactDOM.render(<Image />, container);
    });

    expect(!!container.querySelector(imageSelector)).toBe(true);
  });
});
