import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import LeporelloArtefactRelatedWorksItem from '.';


storiesOf('Components|Organisms/LeporelloArtefactRelatedWorksItem', module)
  .add('default', () => (
    <LeporelloArtefactRelatedWorksItem />
  ));
