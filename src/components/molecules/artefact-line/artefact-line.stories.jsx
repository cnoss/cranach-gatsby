import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import ArtefactLine from '.';


storiesOf('Components|Molecules/ArtefactLine', module)
  .add('default', () => (
    <ArtefactLine />
  ));
