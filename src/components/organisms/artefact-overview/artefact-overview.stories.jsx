import React from 'react';
import { storiesOf } from '@storybook/react';

import '~/styles/main.scss';

import {
  withKnobs,
  number,
} from '@storybook/addon-knobs';

import ArtefactOverview from '.';

storiesOf('Components|Organisms/ArtefactOverview', module)
  .addDecorator(withKnobs)
  .add('without items', () => <ArtefactOverview />)
  .add('with items', () => {
    const dummyItems = [
      {
        langCode: 'de',
        slug: 'hl-christophorus',
        objectName: 'Holzschnitt',
        inventoryNumber: 'LC_HVI-56_79',
        objectId: 940729,
        dating: {
          dated: '1506',
        },
        isVirtual: true,
        sortingNumber: '',
        titles: [
          {
            remarks: '[cda 2019]',
            title: 'Hl. Christophorus',
            type: 'Beschreibender Titel',
          },
        ],
        references: [
          { inventoryNumber: 'AT_A_DG1929-104' },
          { inventoryNumber: 'AT_A_DG1929-105' },
          { inventoryNumber: 'AT_A_DG1929-106' },
          { inventoryNumber: 'AT_A_DG1929-107' },
          { inventoryNumber: 'DE_SMKP_KA-FP-352D' },
          { inventoryNumber: 'DE_KSVC_1-43-64' },
        ],
        image: {
          small: 'http://lucascranach.org/imageserver/G_AT_A_DG1929-104/01_Overall/G_AT_A_DG1929-104_Overall-s.tif.jpg',
          medium: 'http://lucascranach.org/imageserver/G_AT_A_DG1929-104/01_Overall/G_AT_A_DG1929-104_Overall-m.tif.jpg',
          large: 'http://lucascranach.org/imageserver/G_AT_A_DG1929-104/01_Overall/G_AT_A_DG1929-104_Overall-l.tif.jpg',
        },
      },
      {
        langCode: 'de',
        slug: 'christus-am-olberg-aus-der-passion-christi-folge-von-14-holzschnitten',
        objectName: 'Holzschnitt',
        inventoryNumber: 'LC_HVI-19-21_10',
        objectId: 940731,
        dating: {
          dated: '1509',
        },
        isVirtual: true,
        sortingNumber: '',
        titles: [
          {
            remarks: '[cda 2019]',
            title: 'Christus am Ölberg (aus der Passion Christi, Folge von 14 Holzschnitten)',
            type: 'Beschreibender Titel',
          },
        ],
        references: [
          { inventoryNumber: 'AT_A_DG1929-127' },
          { inventoryNumber: 'AT_A_DG1929-128r' },
          { inventoryNumber: 'AT_A_DG1929-142' },
          { inventoryNumber: 'DE_KSVC_1-41-17' },
          { inventoryNumber: 'LC_HVI-19-21_11' },
        ],
        image: {
          small: 'http://lucascranach.org/imageserver/G_AT_A_DG1929-127/01_Overall/G_AT_A_DG1929-127_Overall-s.tif.jpg',
          medium: 'http://lucascranach.org/imageserver/G_AT_A_DG1929-127/01_Overall/G_AT_A_DG1929-127_Overall-m.tif.jpg',
          large: 'http://lucascranach.org/imageserver/G_AT_A_DG1929-127/01_Overall/G_AT_A_DG1929-127_Overall-l.tif.jpg',
        },
      },
    ];

    const graphicsNumber = number('Number of graphics', 5, {
      range: true,
      min: 1,
      max: 50,
      step: 1,
    });

    const items = (new Array(graphicsNumber).fill(0)).map((_, i) => {
      const randomIdx = Math.floor(Math.random() * dummyItems.length);
      const dummyItem = dummyItems[randomIdx];

      return {
        ...dummyItem,
        inventoryNumber: `${dummyItem.inventoryNumber}-${i}`,
      };
    });

    return (
      <ArtefactOverview items={ items }></ArtefactOverview>
    );
  });
