import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import LeporelloGraphicReprintsItem from '.';

const exampleGraphicWithReferences = require('./example-data');

storiesOf('Components|Organisms/LeporelloGraphicReprintsItem', module)
  .add('default', () => (
    <LeporelloGraphicReprintsItem graphic={ exampleGraphicWithReferences } />
  ));
