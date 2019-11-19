
import React from 'react';
import { render } from '@testing-library/react';

import LeporelloGraphicDetailsItem from '.';

const slimDummyGraphic = {
  objectName: 'Holzschnitt: http://vocab.getty.edu/aat/300041405',
  inventoryNumber: 'LC_HVI-56_79',
  titles: [
    {
      remarks: '[cda 2019]',
      title: 'Hl. Christophorus',
      type: 'Beschreibender Titel',
    },
  ],
  catalogWorkReferences: [
    {
      description: 'Bartsch',
      referenceNumber: 'VII.283.58',
    },
    {
      description: 'Hollstein',
      referenceNumber: 'VI.56.79',
    },
  ],
  classification: {
    classification: 'Druckgrafik',
    condition: '',
  },
  dating: {
    begin: 1501,
    dated: '1506',
    end: 1511,
    remarks: '[vordatiert in Block]',
  },
  description: '',
  dimensions: 'Blockmaß: 28,1 x 19,7 cm (+ - 5 mm)\n[cda 2019]',
  involvedPersons: [
    {
      alternativeName: 'Lucas Cranach der Ältere',
      date: '',
      id: '',
      isUnknown: false,
      name: 'Lucas Cranach der Ältere',
      nameType: 'Primärer Name',
      prefix: '',
      remarks: '[Exhib. Cat. Düsseldorf 2017, 155, No. 66]',
      role: 'Inventor',
      suffix: '',
    },
  ],
  additionalTextInformation: [],
  image: {
    small: '',
    medium: '',
    large: '',
    xlarge: '',
  },
};

describe('Organisms/LeporelloGraphicDetailsItem', () => {
  /* Element selectors */
  const leporelloGraphicDetailsItemSelector = '[data-component="organisms/leporello-graphic-details-item"]';

  it('renders correctly', () => {
    const { container } = render(
      <LeporelloGraphicDetailsItem graphic={ slimDummyGraphic } />,
    );

    expect(!!container.querySelector(leporelloGraphicDetailsItemSelector)).toBe(true);
  });
});
