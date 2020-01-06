import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '~/styles/main.scss';

import Closer from '.';


storiesOf('Components|Atoms/Closer', module)
  .add('default', () => (
    <Closer onClose={ action('onClose') }/>
  ));
