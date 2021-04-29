import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import RestorationSurveys from '.';


storiesOf('Components|Molecules/RestorationSurveys', module)
  .add('default', () => (
    <RestorationSurveys />
  ));
