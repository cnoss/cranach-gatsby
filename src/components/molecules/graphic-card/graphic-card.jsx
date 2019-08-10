import React from 'react';
import { css } from '@emotion/core';
import { bgGradient } from '@styles/mixins/background';

const figureStyle = css`
  border-radius: 1rem;
  overflow: hidden;
  background-color: #000;
  display: flex;
  position: relative;

  box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.5);
  margin: 0;
  padding-top: 100%;
`;

const figCaptionStyle = css`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 1.6rem;
  padding-top: 2.5rem;
  padding-bottom: 1rem;

  ${bgGradient()}
`;

const cardImageStyle = css`
  object-fit: cover;
  height: 100%;
  width: 100%;
  display: block;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export default ({ title = '', imgSrc = '', imgAlt = '' }) => (
  <figure css={ figureStyle } className="graphic-card">
    <img
      css={ cardImageStyle }
      className="card-image"
      src={ imgSrc }
      alt={ imgAlt }
    />
    {
      title && (
        <figcaption
          css={ figCaptionStyle }
          className="card-caption helper-bg-gradient"
        >
          <p>{ title }</p>
        </figcaption>
      )
    }
  </figure>
);
