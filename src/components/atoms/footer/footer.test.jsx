
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Footer from './footer';

describe('Footer', () => {
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
      ReactDOM.render(<Footer />, container);
    });

    expect(!!container.querySelector('footer')).toBe(true);
  });

  it('shows the correct footer text', () => {
    const text = 'Example footer text';

    act(() => {
      ReactDOM.render(<Footer>{ text }</Footer>, container);
    });

    const anchor = container.querySelector('footer');

    expect(anchor.textContent).toContain(text);
  });
});
