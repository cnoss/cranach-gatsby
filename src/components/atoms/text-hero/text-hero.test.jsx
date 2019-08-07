
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import TextHero from './text-hero';

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
      ReactDOM.render(<TextHero />, container);
    });

    expect(!!container.querySelector('.text-hero')).toBe(true);
  });

  it('shows the correct text', () => {
    const exampleText = 'Example hero text';

    act(() => {
      ReactDOM.render(
        <TextHero>
          { exampleText }
        </TextHero>,
        container,
      );
    });

    const el = container.querySelector('.text-hero');

    expect(el.textContent).toContain(exampleText);
  });
});
