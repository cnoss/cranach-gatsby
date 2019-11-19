import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import Leporello from '.';


storiesOf('Components|Atoms/Leporello', module)
  .add('default', () => (
    <Leporello />
  ));
