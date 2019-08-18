import React from 'react';
import { css } from '@emotion/core';
import { mediaQuery } from '~/styles/mixins/media-query';

const gridContainerStyle = props => css`
  display: grid;
  grid-column-gap: 1.6rem;
  grid-row-gap: 1.6rem;
  grid-template-columns: 1fr;

  ${mediaQuery.sm()} {
    grid-template-columns: ${Array(props.columns + 1 || 0).join('1fr ')};
  }
`;

export default ({ children }) => (
  <div
    className="grid-container"
    css={ gridContainerStyle({ columns: (children && children.length) || 1 }) }
  >
    { children}
  </div>
);
