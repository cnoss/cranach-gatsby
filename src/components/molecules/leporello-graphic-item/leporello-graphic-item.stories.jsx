import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '~/styles/main.scss';

import LeporelloGraphicItem from '.';


storiesOf('Components|Molecules/LeporelloGraphicItem', module)
  .add('default', () => (
    <LeporelloGraphicItem onToggle={ action('onToggle') }>
      <div style={ {
        padding: '1rem',
        backgroundColor: 'white',
        width: '100%',
        fontSize: '0.9rem',
      } }>
        <p>Example content</p>

        <p style={ { marginTop: '3rem' } }>
          This component should be used as the base for special leporello items.
          It features a toggling mechanism, to signal the opening or closing of the item.
        </p>
        <p>
          It also toggles the class
          <span style={ {
            display: 'inline-block',
            padding: '0 0.25rem 0 0.25rem',
            margin: '0 0.25rem 0 0.25rem',
            border: '1px solid rgb(150, 150, 150)',
            lineHeight: '0.9rem',
            borderRadius: '0.25rem',
            backgroundColor: 'rgb(240, 240, 240)',
          } }>-is-open</span>
          when clicking on the toggle-button.
          This class can be used to style the element and its content accordingly.
        </p>
      </div>
    </LeporelloGraphicItem>
  ))
  .add('with hidden toggler', () => (
    <LeporelloGraphicItem
      onToggle={ action('onToggle') }
      visibleToggler={ false }
    >
      <div style={ {
        padding: '1rem',
        backgroundColor: 'white',
        width: '100%',
        fontSize: '0.9rem',
      } }>
        <p>Example content</p>

        <p style={ { marginTop: '3rem' } }>
          This component should be used as the base for special leporello items.
          It features a toggling mechanism, to signal the opening or closing of the item.
        </p>
        <p>
          It also toggles the class
          <span style={ {
            display: 'inline-block',
            padding: '0 0.25rem 0 0.25rem',
            margin: '0 0.25rem 0 0.25rem',
            border: '1px solid rgb(150, 150, 150)',
            lineHeight: '0.9rem',
            borderRadius: '0.25rem',
            backgroundColor: 'rgb(240, 240, 240)',
          } }>-is-open</span>
          when clicking on the toggle-button.
          This class can be used to style the element and its content accordingly.
        </p>
      </div>
    </LeporelloGraphicItem>
  ));
