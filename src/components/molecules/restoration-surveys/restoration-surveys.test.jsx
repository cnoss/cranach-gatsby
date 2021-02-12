
import React from 'react';
import { render } from '@testing-library/react';

import RestorationSurveys from '.';

describe('Molecules/RestorationSurveys', () => {
  /* Element selectors */
  const restorationSurveysSelector = '[data-component="molecules/restoration-surveys"]';

  it('renders correctly', () => {
    const { container } = render(
      <RestorationSurveys />,
    );

    expect(!!container.querySelector(restorationSurveysSelector)).toBe(true);
  });
});
