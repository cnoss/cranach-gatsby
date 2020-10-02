import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import SearchBar from '.';


storiesOf('Components|Organisms/SearchBar', module)
  .add('default', () => (
    <SearchBar />
  ));
