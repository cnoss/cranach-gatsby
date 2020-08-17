import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import SearchOverview from '.';


storiesOf('Components|Organisms/SearchOverview', module)
  .add('default', () => (
    <SearchOverview />
  ));
