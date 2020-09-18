import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import Btn from '.';


storiesOf('Components|Atoms/Btn', module)
  .add('default', () => (
    <Btn />
  ));
