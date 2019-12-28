import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  withKnobs,
  files,
  text,
} from '@storybook/addon-knobs';

import '~/styles/main.scss';

import Image from '.';

const dummyImage = require('./example-data.json').image.small;


storiesOf('Components|Atoms/Image', module)
  .addDecorator(withKnobs)
  .add('with src', () => {
    const images = files('Image', 'image/*', [dummyImage]);

    return (
      <div style={{ width: '300px' }}>
        <Image
          src={ images[0] }
        ></Image>
      </div>
    );
  })
  .add('without src', () => {
    const images = files('Image', 'image/*', []);

    return (
      <div style={{ width: '300px' }}>
        <Image
          src={ images[0] }
          alt="Alternative text when loading fails"
        ></Image>
      </div>
    );
  })
  .add('with simple caption', () => {
    const images = files('Image', 'image/*', [dummyImage]);
    const captionText = text('Caption text', 'A simple caption text');

    return (
      <div style={{ width: '300px' }}>
        <Image
          src={ images[0] }
          caption={ captionText }
        ></Image>
      </div>
    );
  })
  .add('with complex caption', () => {
    const images = files('Image', 'image/*', [dummyImage]);

    return (
      <div style={{ width: '300px' }}>
        <Image
          src={ images[0] }
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
        ></Image>
      </div>
    );
  });
