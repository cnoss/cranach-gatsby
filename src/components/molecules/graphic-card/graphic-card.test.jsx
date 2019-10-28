
import React from 'react';
import { render } from '@testing-library/react';

import GraphicCard from '.';

/* Mocks */
jest.mock('~/components/atoms/link', () => {
  /* eslint-disable-next-line */
  const { Component, createElement } = require('react');

  class Link extends Component {
    render() {
      return createElement('a', {
        className: 'mock-link',
        href: this.props.to,
      },
      this.props.children);
    }
  }

  return Link;
});

jest.mock('~/components/atoms/image', () => {
  /* eslint-disable-next-line */
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
  /* Element selectors */
  const graphicCardSelector = '[data-component="molecules/graphic-card"]';
  const graphicCardImageSelector = '.card-image';
  const graphicContentSelector = '.card-content';

  it('renders correctly', () => {
    const { container } = render(
      <GraphicCard/>,
    );

    expect(!!container.querySelector(graphicCardSelector)).toBe(true);
  });

  it('skips the caption element, if no title is set', () => {
    const { container } = render(
      <GraphicCard/>,
    );

    const cardEl = container.querySelector(graphicCardSelector);
    const contentEl = cardEl.querySelector(graphicContentSelector);

    expect(!!contentEl).toBe(false);
  });

  it('renders the caption element if a title is set', () => {
    const exampleItemProps = {
      title: 'Example-Title',
      subtitle: 'Example-Subtitle',
    };

    const { container } = render(
      <GraphicCard
        { ...exampleItemProps }
      />,
    );

    const cardEl = container.querySelector(graphicCardSelector);
    const contentEl = cardEl.querySelector(graphicContentSelector);

    expect(!!contentEl).toBe(true);


    expect(contentEl.textContent).toContain(exampleItemProps.title);
  });

  it('uses the correct link url', () => {
    const exampleItemProps = {
      to: 'http://localhost/',
    };

    const { container } = render(
      <GraphicCard
        { ...exampleItemProps }
      />,
    );

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

    const { container } = render(
      <GraphicCard
        { ...exampleItemProps }
      />,
    );

    const cardEl = container.querySelector(graphicCardSelector);
    const cardImageEl = cardEl.querySelector(graphicCardImageSelector);
    const imageEl = cardImageEl.querySelector(mockImageSelector);

    expect(imageEl.getAttribute('src')).toEqual(exampleItemProps.imgSrc);
    expect(imageEl.getAttribute('alt')).toEqual(exampleItemProps.imgAlt);
  });
});
