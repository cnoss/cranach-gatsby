import React, { useState, useEffect } from 'react';

import LeporelloGraphicItem from '~/components/molecules/leporello-graphic-item';
import GraphicsList from '~/components/molecules/graphics-list';

import './leporello-graphic-reprints-item.scss';

export default ({
  graphic,
  className = '',
}) => {
  const [additionalClassNames, setAdditionalClassNames] = useState([]);

  useEffect(() => {
    setAdditionalClassNames(
      [
        ...className.split(' '),
      ],
    );
  }, [className]);

  const referencedItems = graphic.references.map((referenceItem) => {
    const item = referenceItem.ref;

    return {
      title: item.owner || '',
      to: `/${item.langCode}/${item.slug}`,
      imgSrc: (item && item.image && item.image.small),
    };
  });

  return (
    <LeporelloGraphicItem
      className={ `leporello-graphic-reprints-item ${additionalClassNames.join(' ')}` }
      data-component="organisms/leporello-graphic-reprints-item"
    >
      <div className="columns">
        <div className="column is-one-quarter intro">
          <h1 className="title">1. Zustand</h1>
          <p className="description">
            Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen,
            gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße.
          </p>
        </div>

        <div className="column reprints-list">
          <h2 className="title">Abzüge</h2>
          <GraphicsList items={ referencedItems } />
        </div>
      </div>
    </LeporelloGraphicItem>
  );
};
