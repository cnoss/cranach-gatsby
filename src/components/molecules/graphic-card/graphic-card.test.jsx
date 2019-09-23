
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import GrahpicCard from './graphic-card';

/* Mocks */
jest.mock('~/components/atoms/link', () => {
  const { Component, createElement } = require('react');

  class Link extends Component {
    render() {
      return createElement('a', {
          className: 'mock-link',
          href: this.props.to
        },
        this.props.children,
      );
    }
  }

  return Link;
});

jest.mock('~/components/atoms/image', () => {
  const { Component, createElement } = require('react');

  class Image extends Component {
    render() {
      return createElement('img', {
        className: 'mock-image',
        ...this.props,
      });
    }
  }

  return Image;
});

const mockLinkSelector = '.mock-link';
const mockImageSelector = '.mock-image';


describe('Molecules/GraphicCard', () => {
  let container;

  /* Element selectors */
  const graphicCardSelector = '.graphic-card';
  const graphicCardImageSelector = '.card-image';
  const graphicContentSelector = '.card-content';
  const graphicTitleSelector = '.card-content .title';
  const graphicSubtitleSelector = '.card-content .subtitle';

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
    const contentEl = cardEl.querySelector(graphicContentSelector);

    expect(!!contentEl).toBe(false);
  });

  it('renders the caption element if a title is set', () => {
    const exampleItemProps = {
      title: 'Example-Title',
      subtitle: 'Example-Subtitle',
    };

    act(() => {
      ReactDOM.render(
        <GrahpicCard
          { ...exampleItemProps }
        />,
        container,
      );
    });

    const cardEl = container.querySelector(graphicCardSelector);
    const contentEl = cardEl.querySelector(graphicContentSelector);
    const titleEl = cardEl.querySelector(graphicTitleSelector);

    expect(!!contentEl).toBe(true);


    expect(contentEl.textContent).toContain(exampleItemProps.title);
  });

  it('uses the correct link url', () => {
    const exampleItemProps = {
      to: 'http://localhost/',
    };

    act(() => {
      ReactDOM.render(
        <GrahpicCard
          { ...exampleItemProps }
        />,
        container,
      );
    });

    const cardEl = container.querySelector(graphicCardSelector);
    const cardImageEl = cardEl.querySelector(graphicCardImageSelector);
    const linkEl = cardImageEl.querySelector(mockLinkSelector);

    expect(linkEl.getAttribute('href')).toEqual(exampleItemProps.to);
  });

  it('uses the correct img-src and alt-text', () => {
    const exampleItemProps = {
      imgSrc: 'http://localhost/img.jpg',
      imgAlt: 'Example-Alt-Text',
    };

    act(() => {
      ReactDOM.render(
        <GrahpicCard
          { ...exampleItemProps }
        />,
        container,
      );
    });

    const cardEl = container.querySelector(graphicCardSelector);
    const cardImageEl = cardEl.querySelector(graphicCardImageSelector);
    const imageEl = cardImageEl.querySelector(mockImageSelector);

    expect(imageEl.getAttribute('src')).toEqual(exampleItemProps.imgSrc);
    expect(imageEl.getAttribute('alt')).toEqual(exampleItemProps.imgAlt);
  });
});
