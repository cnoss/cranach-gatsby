import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import './zoom-image.scss';

const zoomInRest = require('./images/zoomin_rest.png');
const zoomInHover = require('./images/zoomin_hover.png');

const zoomOutRest = require('./images/zoomout_rest.png');
const zoomOutHover = require('./images/zoomout_hover.png');

const homeRest = require('./images/home_rest.png');
const homeHover = require('./images/home_hover.png');

const fullpageRest = require('./images/fullpage_rest.png');
const fullpageHover = require('./images/fullpage_hover.png');

const navImages = {
  zoomIn: {
    REST: zoomInRest,
    GROUP: zoomInHover,
    HOVER: zoomInHover,
    DOWN: zoomInHover,
  },
  zoomOut: {
    REST: zoomOutRest,
    GROUP: zoomOutHover,
    HOVER: zoomOutHover,
    DOWN: zoomOutHover,
  },
  home: {
    REST: homeRest,
    GROUP: homeHover,
    HOVER: homeHover,
    DOWN: homeHover,
  },
  fullpage: {
    REST: fullpageRest,
    GROUP: fullpageHover,
    HOVER: fullpageHover,
    DOWN: fullpageHover,
  },
};

export default ({
  src,
  baseSrc,
  alt,
  caption,
}) => {
  const figureElRef = useRef(null);
  const imageElRef = useRef(null);
  const viewerRef = useRef(null);
  const [activeZoom, setActiveZoom] = useState(false);

  useEffect(() => {
    if (!figureElRef.current || !imageElRef.current) {
      return;
    }
    /* OpenSeaDragon references 'document',
    so we have to skip the import to prevent an error
    while building the site */
    if (!window || !window.document) {
      return;
    }

    if (viewerRef.current) {
      viewerRef.current.destroy();
    }

    import('openseadragon').then((OpenSeaDragon) => {
      viewerRef.current = new OpenSeaDragon.Viewer({
        element: figureElRef.current,
        tileSources: {
          type: 'image',
          url: src,
        },
        prefixUrl: '',
        navImages,
      });

      viewerRef.current.addOnceHandler('open', () => {
        setActiveZoom(true);
      });
    });
  }, [src, imageElRef, figureElRef]);

  return (
    <figure
      ref={figureElRef}
      className={`zoom-image ${activeZoom ? 'has-active-zoom' : ''}`}
      data-component="atoms/zoom-image"
    >
      <img
        ref={imageElRef}
        className="preload-image"
        src={baseSrc}
        alt={alt}
      />

      {caption && <figcaption
        className="zoom-image-caption"
      >
        <p className="text">{caption}</p>
      </figcaption>
      }
    </figure>
  );
};
