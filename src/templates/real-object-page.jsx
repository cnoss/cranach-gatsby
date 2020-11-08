/* src/templates/real-object-page.js */

import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react-lite';

import Leporello from '~/components/atoms/leporello';
import LeporelloGraphicRealItem from '~/components/organisms/leporello-graphic-real-item';

import StoreContext from '~/store/StoreContext';

const PageTemplate = ({ pageContext }) => {
  const { ui } = useContext(StoreContext);
  const graphic = pageContext;
  const title = (graphic.titles[0] && graphic.titles[0].title) || '';

  ui.setLanguage(graphic.langCode);

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

export default observer(PageTemplate);
