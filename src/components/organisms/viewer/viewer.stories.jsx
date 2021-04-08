import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import Viewer from '.';


storiesOf('Components|Organisms/Viewer', module)
  .add('default', () => (
    <Viewer />
  ));
