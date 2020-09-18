import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import SearchSidebar from '.';


storiesOf('Components|Organisms/SearchSidebar', module)
  .add('default', () => (
    <SearchSidebar />
  ));
