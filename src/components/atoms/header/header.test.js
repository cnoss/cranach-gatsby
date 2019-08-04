
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Header from './header';

describe('Header', () => {
  let container;

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
      ReactDOM.render(<Header />, container);
    });

    expect(!!container.querySelector('header')).toBe(true);
  });

  it('shows the correct headline text', () => {
    const title = 'Cranach Digital Archive';

    act(() => {
      ReactDOM.render(<Header />, container);
    });

    const anchor = container.querySelector('.logo');

    expect(anchor.textContent).toContain(title);
  });
});
