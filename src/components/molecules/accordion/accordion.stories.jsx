import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import Accordion from '.';


storiesOf('Components|Molecules/Accordion', module)
  .add('default', () => (
    <Accordion />
  ));
