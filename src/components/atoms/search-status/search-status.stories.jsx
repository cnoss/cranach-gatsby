import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import SearchStatus from '.';


storiesOf('Components|Atoms/SearchStatus', module)
  .add('default', () => (
    <SearchStatus />
  ));
