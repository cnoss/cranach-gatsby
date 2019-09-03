// src/templates/page.js

import React from 'react';
import Helmet from 'react-helmet';
import { css } from '@emotion/core';

import { mediaQuery } from '~/styles/mixins/media-query';

import Header from '~/components/atoms/header';
import Footer from '~/components/atoms/footer';
import GridContainer from '~/components/molecules/grid-container';
import Image from '~/components/atoms/image';

const pageStyle = css`
  ${mediaQuery.lg()} {
    width: 1400px;
    margin: 0 auto;
  }
`;

const mainStyle = css`
  margin-bottom: 2.5rem;
`;

const PageTemplate = ({ pageContext }) => {
  const graphic = pageContext;

  const title = (graphic.titles[0] && graphic.titles[0].title) || '';

  return (
    <div
      className="page"
      css={ pageStyle }
    >
      <Helmet>
        <title>Grafiken | { title }</title>
      </Helmet>

      <Header />

      <main
        css={ mainStyle }
      >
        <article>
          <GridContainer>
            <Image
              src={ graphic.image.large }
              alt={ title }
            ></Image>

            <p>{ title }</p>
          </GridContainer>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PageTemplate;
