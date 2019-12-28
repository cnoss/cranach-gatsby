import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import {
  withKnobs,
  files,
  text,
} from '@storybook/addon-knobs';

import ArtefactCard from '.';

const dummyImage = require('./example-data.json').image.small;


storiesOf('Components|Molecules/ArtefactCard', module)
  .addDecorator(withKnobs)
  .add('with all properties', () => {
    const images = files('Image', 'image/*', [dummyImage]);
    const imgAltText = text('Image alt text', 'Alternative text');
    const titleText = text('Title', 'A title');
    const subtitleText = text('Subtitle', 'A subtitle');
    const urlText = text('Link-URL', '/');

    return (
      <div style={{ width: '300px' }}>
        <ArtefactCard
          title={ titleText }
          subtitle={ subtitleText }
          to={ urlText }
          imgSrc={ images[0] }
          imgAlt={ imgAltText }
        >
        </ArtefactCard>
      </div>
    );
  })
  .add('without imgSrc', () => {
    const images = files('Image', 'image/*', []);
    const imgAltText = text('Image alt text', 'Alternative text');
    const titleText = text('Title', 'A title');
    const subtitleText = text('Subtitle', 'A subtitle');
    const urlText = text('Link-URL', '/');

    return (
      <div style={{ width: '300px' }}>
        <ArtefactCard
          title={ titleText }
          subtitle={ subtitleText }
          to={ urlText }
          imgSrc={ images[0] }
          imgAlt={ imgAltText }
        >
        </ArtefactCard>
      </div>
    );
  });
