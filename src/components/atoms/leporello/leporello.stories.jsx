import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import Leporello from '.';


storiesOf('Components|Atoms/Leporello', module)
  .add('default', () => (
    <Leporello>
      <Leporello.Item>
        First Leporello item
      </Leporello.Item>

      <Leporello.Item>
        Second Leporello item
      </Leporello.Item>

      <Leporello.Item>
        Third Leporello item
      </Leporello.Item>
    </Leporello>
  ));
