import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  withKnobs,
  files,
  text,
} from '@storybook/addon-knobs';

import '~/styles/main.scss';

import ZoomImage from '.';

const dummySmallImage = require('./example-data.json').image.small;
const dummyXLargeImage = require('./example-data.json').image.xlarge;


storiesOf('Components|Atoms/ZoomImage', module)
  .addDecorator(withKnobs)
  .add('with src', () => {
    const baseImage = files('Base-Image', 'image/*', [dummySmallImage]);
    const image = files('Image', 'image/*', [dummyXLargeImage]);

    return (
      <div style={{ width: '300px' }}>
        <ZoomImage
          baseSrc={ baseImage[0] }
          src={ image[0] }
        ></ZoomImage>
      </div>
    );
  })
  .add('without src', () => {
    const baseImage = files('Base-Image', 'image/*', []);
    const image = files('Image', 'image/*', []);

    return (
      <div style={{ width: '300px' }}>
        <ZoomImage
          baseSrc={ baseImage[0] }
          src={ image[0] }
          alt="Alternative text when loading fails"
        ></ZoomImage>
      </div>
    );
  })
  .add('with simple caption', () => {
    const baseImage = files('Base-Image', 'image/*', [dummySmallImage]);
    const image = files('Image', 'image/*', [dummyXLargeImage]);
    const captionText = text('Caption text', 'A simple caption text');

    return (
      <div style={{ width: '300px' }}>
        <ZoomImage
          baseSrc={ baseImage[0] }
          src={ image[0] }
          caption={ captionText }
        ></ZoomImage>
      </div>
    );
  })
  .add('with complex caption', () => {
    const baseImage = files('Base-Image', 'image/*', [dummySmallImage]);
    const image = files('Image', 'image/*', [dummyXLargeImage]);

    return (
      <div style={{ width: '300px' }}>
        <ZoomImage
          baseSrc={ baseImage[0] }
          src={ image[0] }
          caption={
          <span>
            <a href="//lucascranach.org/">A link as caption</a>
            <br />
            <a href="//th-koeln">A second link as caption</a>
            <br />
            <input style={ {
              position: 'absolute',
              right: '-1rem',
              bottom: '-0.25rem',
            } } type="checkbox" />
          </span>
        }
        ></ZoomImage>
      </div>
    );
  });
