import React from 'react';
import { css } from '@emotion/core';

const figureStyle = css`
`;

const imageStyle = ({ sticky = false }) => css`
  width: 100%;
  vertical-align: middle;

  ${(sticky && 'position: sticky; top: 0;') || ''}
`;

export default ({
  src,
  alt,
  sticky = false,
  caption,
}) => (
  <figure
    className="image"
    css={ figureStyle }
  >
    <img
      src={ src }
      alt={ alt }
      css={ imageStyle({ sticky }) }
    ></img>

    { caption && <figcaption>
        { caption }
      </figcaption>
    }
  </figure>
);
