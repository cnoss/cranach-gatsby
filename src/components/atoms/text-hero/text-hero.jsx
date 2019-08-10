import React from 'react';
import { css } from '@emotion/core';

const textHeroStyle = css`
  font-size: 1.25rem;
  padding-bottom: 1.6rem;
`;

export default ({ children }) => (
  <p
    css={ textHeroStyle }
    className="text-hero"
  >
    { children }
  </p>
);
