import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import GraphicsList from '.';


storiesOf('Components|Molecules/GraphicsList', module)
  .add('default', () => (
    <GraphicsList />
  ));
