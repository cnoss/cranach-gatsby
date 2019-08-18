import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

const footerStyle = css`
  border-top: solid #666666 1px;
  padding-top: 1.6rem;
`;

const footerLinkStyle = css`
  text-decoration: none;
  color: #FFFFFF;
`;

export default () => (
  <footer
    css={ footerStyle }
  >
    <Link
      to="/"
      css={ footerLinkStyle }
    >© 2019 / Cranach Digital Archive</Link>
  </footer>
);
