import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import Switcher from '.';


storiesOf('Components|Atoms/Switcher', module)
  .add('default', () => (
    <Switcher />
  ));
