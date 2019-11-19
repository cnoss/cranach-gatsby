import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import LeporelloGraphicDetailsItem from '.';


storiesOf('Components|Organisms/LeporelloGraphicDetailsItem', module)
  .add('default', () => (
    <LeporelloGraphicDetailsItem />
  ));
