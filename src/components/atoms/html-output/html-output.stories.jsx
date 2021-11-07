import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import HtmlOutput from '.';


storiesOf('Components|Atoms/HtmlOutput', module)
  .add('default', () => (
    <HtmlOutput />
  ));
