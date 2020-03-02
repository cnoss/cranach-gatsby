import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import DynamicTable from '.';


storiesOf('Components|Atoms/DynamicTable', module)
  .add('default', () => (
    <DynamicTable />
  ));
