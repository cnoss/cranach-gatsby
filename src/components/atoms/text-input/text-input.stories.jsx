import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import TextInput from '.';


storiesOf('Components|Atoms/TextInput', module)
  .add('default', () => (
    <TextInput />
  ));
