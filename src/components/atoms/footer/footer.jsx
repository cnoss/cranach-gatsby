import React from 'react';

import { css } from '@emotion/core';

const footerStyle = css`
  border-top: solid #666666 1px;
  padding-top: 1.6rem;
`;

export default props => (
  <footer
    css={ footerStyle }
  >
    { props.children }
  </footer>
);
