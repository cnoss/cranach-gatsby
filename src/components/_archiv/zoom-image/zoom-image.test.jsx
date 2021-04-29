
import React from 'react';
import { render } from '@testing-library/react';

import ZoomImage from '.';


describe('Atoms/ZoomImage', () => {
  /* Element selectors */
  const zoomImageSelector = '[data-component="atoms/zoom-image"]';
  const zoomImageCaptionSelector = '.zoom-image-caption';
  const hasActiveZoomImageSelector = '.has-active-zoom';

  it('renders correctly', () => {
    const { container } = render(
      <ZoomImage/>,
    );

    expect(!!container.querySelector(zoomImageSelector)).toBe(true);
  });

  it('shows zoom-image caption if given', () => {
    const captionText = 'Example caption text';

    const firstRender = render(
      <ZoomImage/>,
    );

    expect(!!firstRender.container.querySelector(zoomImageCaptionSelector)).toBe(false);
    expect(!!firstRender.queryByText(captionText)).toBe(false);

    const secondRender = render(
      <ZoomImage
        caption={ captionText }
      />,
    );

    expect(!!secondRender.container.querySelector(zoomImageCaptionSelector)).toBe(true);
    expect(secondRender.getByText(captionText)).toHaveTextContent(captionText);
  });

  it('has by default no active zoom', () => {
    const { container } = render(
      <ZoomImage/>,
    );

    expect(!!container.querySelector(hasActiveZoomImageSelector)).toBe(false);
  });
});
