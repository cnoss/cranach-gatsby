import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core'

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

export default (props) => (
  <Figure>
    <img
      className="card-image"
      alt="Platzhalter"
      src="https://via.placeholder.com/400x700/000000/666666" />
    <FigCaption className="helper-bg-gradient">
      <p>{ props.item.titles[0].title }</p>
    </FigCaption>
  </Figure>
)
