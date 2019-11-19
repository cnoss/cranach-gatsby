import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import LeporelloGraphicReprintsItem from '.';


storiesOf('Components|Organisms/LeporelloGraphicReprintsItem', module)
  .add('default', () => (
    <LeporelloGraphicReprintsItem />
  ));
