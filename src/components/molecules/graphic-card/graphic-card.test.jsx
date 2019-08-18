
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import GrahpicCard from './graphic-card';

describe('GraphicCard', () => {
  let container;

  /* Element selectors */
  const graphicCardSelector = '.graphic-card';
  const graphicImageSelector = '.card-image';
  const graphicCaptionSelector = '.card-caption';

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
        <GrahpicCard/>,
        container,
      );
    });

    expect(!!container.querySelector(graphicCardSelector)).toBe(true);
  });

  it('skips the caption element, if no title is set', () => {
    act(() => {
      ReactDOM.render(
        <GrahpicCard />,
        container,
      );
    });

    const cardEl = container.querySelector(graphicCardSelector);
    const titleEl = cardEl.querySelector(graphicCaptionSelector);

    expect(!!titleEl).toBe(false);
  });

  it('renders the caption element if a title is set', () => {
    const exampleItem = {
      title: 'Example-Title',
    };

    act(() => {
      ReactDOM.render(
        <GrahpicCard
          title={ exampleItem.title }
        />,
        container,
      );
    });

    const cardEl = container.querySelector(graphicCardSelector);
    const titleEl = cardEl.querySelector(graphicCaptionSelector);

    expect(!!titleEl).toBe(true);
    expect(titleEl.textContent).toContain(exampleItem.title);
  });

  it('uses the correct img-src and alt-text', () => {
    const exampleItem = {
      imgSrc: 'http://localhost/img.jpg',
      imgAlt: 'Example-Alt-Text',
    };

    act(() => {
      ReactDOM.render(
        <GrahpicCard
          imgSrc={ exampleItem.imgSrc }
          imgAlt={ exampleItem.imgAlt }
        />,
        container,
      );
    });

    const cardEl = container.querySelector(graphicCardSelector);
    const cardImageEl = cardEl.querySelector(graphicImageSelector);

    expect(cardImageEl.getAttribute('src')).toEqual(exampleItem.imgSrc);
    expect(cardImageEl.getAttribute('alt')).toEqual(exampleItem.imgAlt);
  });
});
