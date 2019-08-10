import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

const h1Style = css`
  font-size: 2.5rem;
`;

export default () => (
  <header>
    <h1
      css={ h1Style }
    >
      <Link className="logo" to="/">Cranach Digital Archive</Link>
    </h1>
  </header>
);
