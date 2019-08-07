import React from 'react';
import styled from '@emotion/styled';

const Figure = styled.figure`
  border-radius: 1rem;
  overflow: hidden;
  background-color: #000;
  display: flex;
  position: relative;

  box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.5);
  margin: 0;
  padding-top: 100%;
`;

const FigCaption = styled.figcaption`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 1.6rem;
  padding-top: 2.5rem;
  padding-bottom: 1rem;
`;

export default ({ title = '', imgSrc = '', imgAlt = '' }) => (
  <Figure className="graphic-card">
    <img
      className="card-image"
      src={ imgSrc }
      alt={ imgAlt }
    />
    {
      title && (
        <FigCaption className="card-caption helper-bg-gradient">
          <p>{ title }</p>
        </FigCaption>
      )
    }
  </Figure>
);
