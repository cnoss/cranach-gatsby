import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import SearchHeader from '.';


storiesOf('Components|Molecules/SearchHeader', module)
  .add('default', () => (
    <SearchHeader />
  ));
