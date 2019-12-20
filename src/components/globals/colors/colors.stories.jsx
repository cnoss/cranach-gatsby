import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import Logo from '.';


storiesOf('Components|Atoms/Logo', module)
  .add('default', () => (
    <Logo />
  ));
