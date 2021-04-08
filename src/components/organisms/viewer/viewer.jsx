import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import cranachCfg from '~/cranach.config';
import './viewer.scss';

const { imageServer } = cranachCfg;

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
  artefact,
}) => {
  const figureElRef = useRef(null);
  const viewerRef = useRef(null);
  const [activeZoom, setActiveZoom] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImage, setActiveImage] = useState(
    artefact.images.find(
      (image) => image.variants.tiles.src === artefact.placeholder.tiles.src,
    ),
  );

  const getTilesUrl = (tiles) => tiles.src.replace(
    imageServer.urlImages,
    imageServer.baseUrlTiles,
  );

  const src = getTilesUrl(artefact.placeholder.tiles);

  const hideLoadIndicator = () => {
    setIsLoaded(true);
  };

  const showLoadIndicator = () => {
    setIsLoaded(false);
  };

  useEffect(() => {
    if (!figureElRef.current) {
      return () => {};
    }
    /* OpenSeaDragon references 'document',
    so we have to skip the import to prevent an error
    while building the site */
    if (!window || !window.document) {
      return () => {};
    }

    import('openseadragon').then((OpenSeaDragon) => {
      viewerRef.current = new OpenSeaDragon.Viewer({
        element: figureElRef.current,
        tileSources: src,
        prefixUrl: '',
        sequenceMode: false,
        navImages,
        showNavigator: true,
      });
      viewerRef.current.addOnceHandler('open', () => {
        setActiveZoom(true);
      });
      viewerRef.current.addHandler('open', () => {
        const tiledImage = viewerRef.current.world.getItemAt(0);

        if (tiledImage.getFullyLoaded()) {
          hideLoadIndicator();
        } else {
          tiledImage.addHandler('fully-loaded-change', hideLoadIndicator);
        }
      });
    });

    return function seadragonCleanUp() {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [src, figureElRef]);

  useEffect(() => {
    if (!viewerRef.current) return;

    showLoadIndicator();
    viewerRef.current.open(
      getTilesUrl(activeImage.variants.tiles),
    );
  }, [viewerRef, activeImage]);

  return (<div
    className="viewer"
    data-component="organisms/viewer"
  >
    <figure
      ref={figureElRef}
      className={`zoom-image ${activeZoom ? 'has-active-zoom' : ''} ${isLoaded ? 'is-loaded' : ''}`}
    >
    </figure>

   <ul className="image-stripe-list">
      {artefact.images.map((image) => (
        <li key={image.id} onClick={() => setActiveImage(image)} className={(image === activeImage) ? 'image-stripe-list__item is-active' : 'image-stripe-list__item'}>
          <img src={image.thumbnail} alt={image.altText} />
        </li>
      ))}
    </ul>
  </div >);
};
