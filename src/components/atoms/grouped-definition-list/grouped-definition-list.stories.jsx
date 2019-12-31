import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  withKnobs,
  array,
} from '@storybook/addon-knobs';

import '~/styles/main.scss';

import DefinitionList from '.';

storiesOf('Components|Atoms/DefinitionList', module)
  .addDecorator(withKnobs)
  .add('with items', () => {
    const termDefinitionItems = array('Items', [
      'First Term = First Definition',
      'Second Term = Second Definition',
      'Third Term = Third Definition',
      'Fourth Term = Fourth Definition',
    ], ';');
    return (
      <div style={{ width: '300px' }}>
        <DefinitionList>
          {
            termDefinitionItems.map((termDefinition, idx) => {
              const splitTermDefinition = termDefinition.split('=').map(split => split.trim());

              return (<DefinitionList.Entry
                key={ idx }
                term={ splitTermDefinition[0] }
                definition={ splitTermDefinition[1] }
              />);
            })
          }
        </DefinitionList>
      </div>
    );
  });
