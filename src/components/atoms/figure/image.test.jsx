
import React from 'react';
import { render } from '@testing-library/react';

import Image from '.';

describe('Atoms/Image', () => {
  /* Element selectors */
  const imageSelector = '[data-component="atoms/image"]';
  const imageCaptionSelector = '.image-caption';

  it('renders correctly', () => {
    const { container } = render(
      <Image/>,
    );

    expect(!!container.querySelector(imageSelector)).toBe(true);
  });

  it('shows image caption if given', () => {
    const captionText = 'Example caption text';

    const firstRender = render(
      <Image/>,
    );

    expect(!!firstRender.container.querySelector(imageCaptionSelector)).toBe(false);
    expect(!!firstRender.queryByText(captionText)).toBe(false);

    const secondRender = render(
      <Image
        caption={ captionText }
      />,
    );

    expect(!!secondRender.container.querySelector(imageCaptionSelector)).toBe(true);
    expect(secondRender.getByText(captionText)).toHaveTextContent(captionText);
  });
});
