import React from 'react';
import styled from '@emotion/styled';

const P = styled.p`
  font-size: 1.25rem;
  padding-bottom: 1.6rem;
`;

export default ({ children }) => (
  <P className="text-hero">
    { children }
  </P>
);
