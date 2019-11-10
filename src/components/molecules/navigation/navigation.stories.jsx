import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import Navigation from '.';

storiesOf('Components|Molecules/Navigation', module)
  .add('default', () => <Navigation />);
