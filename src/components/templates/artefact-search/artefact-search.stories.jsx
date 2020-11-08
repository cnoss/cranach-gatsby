import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import ArtefactSearch from '.';


storiesOf('Components|Organisms/ArtefactSearch', module)
  .add('default', () => (
    <ArtefactSearch />
  ));
