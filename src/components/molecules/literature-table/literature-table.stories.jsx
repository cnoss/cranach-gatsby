import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import LiteratureTable from '.';


storiesOf('Components|Molecules/LiteratureTable', module)
  .add('default', () => (
    <LiteratureTable />
  ));
