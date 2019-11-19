import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import LeporelloGraphicItem from '.';


storiesOf('Components|Molecules/LeporelloGraphicItem', module)
  .add('default', () => (
    <LeporelloGraphicItem />
  ));
