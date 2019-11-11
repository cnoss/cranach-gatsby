import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '~/styles/main.scss';

import Toggler from '.';


storiesOf('Components|Atoms/Toggler', module)
  .add('default', () => (
    <Toggler onToggle={ action('onToggle') }/>
  ));
