import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import {
  withKnobs,
  number,
} from '@storybook/addon-knobs';

import GraphicsList from '.';

const dummyItems = require('./example-data');

storiesOf('Components|Molecules/GraphicsList', module)
  .addDecorator(withKnobs)
  .add('without items', () => (
    <GraphicsList items={ [] } />
  ))
  .add('with dynamic number of items', () => {
    const graphicsNumber = number('Number of graphics', 5, {
      range: true,
      min: 1,
      max: 50,
      step: 1,
    });

    const dynItems = (new Array(graphicsNumber).fill(0)).map((_, i) => {
      const randomIdx = Math.floor(Math.random() * dummyItems.length);
      const dummyItem = dummyItems[randomIdx];

      return {
        ...dummyItem,
        imgSrc: `${dummyItem.imgSrc}#${i}`,
      };
    });

    return (
      <GraphicsList items={ dynItems } />
    );
  });
