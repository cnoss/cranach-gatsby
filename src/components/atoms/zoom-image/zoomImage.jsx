import React, { useState, useRef } from 'react';

import OpenSeaDragon from 'openseadragon';

import './zoomImage.scss';


export default ({
  src,
  baseSrc,
  alt,
  caption,
}) => {
  const figureElRef = useRef(null);
  const [activeZoom, setActiveZoom] = useState(false);

  const baseImageLoaded = () => {
    const viewer = OpenSeaDragon({
      element: figureElRef.current,
      tileSources: {
        type: 'image',
        url: src,
      },
      navImages: {
        zoomIn: {
          REST: 'zoomin_rest.png',
          GROUP: 'zoomin_hover.png',
          HOVER: 'zoomin_hover.png',
          DOWN: 'zoomin_hover.png',
        },
        zoomOut: {
          REST: 'zoomout_rest.png',
          GROUP: 'zoomout_hover.png',
          HOVER: 'zoomout_hover.png',
          DOWN: 'zoomout_hover.png',
        },
        home: {
          REST: 'home_rest.png',
          GROUP: 'home_hover.png',
          HOVER: 'home_hover.png',
          DOWN: 'home_hover.png',
        },
        fullpage: {
          REST: 'fullpage_rest.png',
          GROUP: 'fullpage_hover.png',
          HOVER: 'fullpage_hover.png',
          DOWN: 'fullpage_hover.png',
        },
      },
    });

    viewer.addHandler('open', () => {
      setActiveZoom(true);
    });
  };

  return (
    <figure
      ref={ figureElRef }
      className={ `zoom-image ${activeZoom ? 'has-active-zoom' : ''}` }
    >
      <img
        className="preload-image"
        src={ baseSrc }
        alt={ alt }
        onLoad={ baseImageLoaded }
      ></img>

      { caption && <figcaption>
          { caption }
        </figcaption>
      }
    </figure>
  );
};
