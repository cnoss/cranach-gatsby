import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import LeporelloGraphicRelatedWorksItem from '.';


storiesOf('Components|Organisms/LeporelloGraphicRelatedWorksItem', module)
  .add('default', () => (
    <LeporelloGraphicRelatedWorksItem />
  ));
