/* Development-Mode: For changes to take effect, development-mode has to be restarted */

import React from 'react';
import { css } from '@emotion/core';
import { mediaQuery } from '~/styles/mixins/media-query';

const defaultStyle = css`
  background-color: #333333;
  padding: 1.25rem;
  font-family: "IBMPlexSansLight";
  color: #B4B4B4;
  font-size: 80%;

  ${mediaQuery.sm()} {
    padding: 1.6rem;
    font-size: 100%;
  }
`;

export default function HTML(props) {
  return (
    <html
      {...props.htmlAttributes}
      css={ defaultStyle }
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="stylesheet" type="text/css" href="/styles/fonts.css" />
        <link rel="stylesheet" type="text/css" href="/styles/reset.css" />
        <link rel="stylesheet" type="text/css" href="/styles/global.css" />
        {props.headComponents}
      </head>
      <body
        {...props.bodyAttributes}
        css={ defaultStyle }
      >
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={'body'}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}
