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

export default ({ item }) => {
  if (!item) {
    throw new Error('graphic-card: Missing item prop');
  }
  const imgSrc = 'https://via.placeholder.com/400x700/000000/666666';
  const title = (item.titles[0] && item.titles[0].title) || '';

  return (
    <Figure>
      <img
        className="card-image"
        alt="Platzhalter"
        src={ imgSrc } />
      {
        title && (
          <FigCaption className="helper-bg-gradient">
            <p>{ title }</p>
          </FigCaption>
        )
      }
    </Figure>
  );
};
