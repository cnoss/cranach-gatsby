import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

const h1Style = css`
  font-size: 2.5rem;
`;

const logoStyle = css`
  font-weight: 100;
  display: block;
  border-bottom: solid 1px #666666;
  padding-bottom: 2rem;
  margin-bottom: 2.5rem;
`;

export default () => (
  <header>
    <h1
      css={ h1Style }
    >
      <Link
        className="logo"
        to="/"
        css={ logoStyle }
      >Cranach Digital Archive</Link>
    </h1>
  </header>
);
