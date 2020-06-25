import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import InvolvedPersonsTable from '.';


storiesOf('Components|Molecules/InvolvedPersonsTable', module)
  .add('default', () => (
    <InvolvedPersonsTable />
  ));
