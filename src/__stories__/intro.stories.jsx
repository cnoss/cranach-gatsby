import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Global|Overview', module)
  .addParameters({
    options: {
      showPanel: false,
      isToolshown: false,
    },
  })
  .add('Welcome', () => (
    <div>Welcome</div>
  ));
