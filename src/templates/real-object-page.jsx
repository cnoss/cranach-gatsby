/* src/templates/real-object-page.js */

import React from 'react';
import Helmet from 'react-helmet';
import i18n from '~/i18n';

import Leporello from '~/components/atoms/leporello';
import LeporelloGraphicRealItem from '~/components/organisms/leporello-graphic-real-item';


const PageTemplate = ({ pageContext }) => {
  const graphic = pageContext;
  const title = (graphic.titles[0] && graphic.titles[0].title) || '';
  i18n(graphic.langCode);

  return (
    <div
      className="template"
      data-template="real-object-page"
    >
      <Helmet>
        <title>Grafiken | {title} | Real</title>
      </Helmet>

      <section className="body">
        <Leporello>
          <LeporelloGraphicRealItem
            graphic={graphic}
            visibleCloser={false}
          />
        </Leporello>
      </section>
    </div>
  );
};

export default PageTemplate;
