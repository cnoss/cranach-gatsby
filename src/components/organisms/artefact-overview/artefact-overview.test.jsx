
import React from 'react';
import { render } from '@testing-library/react';

import GraphicsOverview from '.';

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


describe('Organisms/GraphicsOverview', () => {
  /* Element selectors */
  const graphicsOverviewSelector = '[data-component="organisms/graphics-overview"]';
  const graphicsOverviewGraphicSelector = '.item';

  it('renders correctly', () => {
    const { container } = render(
      <GraphicsOverview />,
    );

    expect(!!container.querySelector(graphicsOverviewSelector)).toBe(true);
  });

  it('renders the correct number of graphic items', () => {
    const emptyRender = render(
      <GraphicsOverview />,
    );

    const graphicEls = emptyRender.container.querySelectorAll(graphicsOverviewGraphicSelector);
    expect(graphicEls.length).toBe(0);

    const renderWithChildren = render(
      <GraphicsOverview items={ dummyItems } />,
    );

    const secondGraphicEls = renderWithChildren.container.querySelectorAll(
      graphicsOverviewGraphicSelector,
    );
    expect(secondGraphicEls.length).toBe(dummyItems.length);
  });
});
