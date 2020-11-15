import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import Async from 'react-async';

import imageData from '~/libs/artefact-data';
import './viewer.scss';

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
  inventoryNumber,
  placeholder,
}) => {
  const figureElRef = useRef(null);
  const imageElRef = useRef(null);
  const viewerRef = useRef(null);
  const [activeZoom, setActiveZoom] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  let [images] = useState(null);
  const { src } = placeholder.l;

  const hideLoadIndicator = () => {
    setIsLoaded(true);
    return null;
  };

  const showLoadIndicator = () => {
    setIsLoaded(false);
    return null;
  };

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
        tileSources: [
          {
            type: 'image',
            url: src,
          },
        ],
        prefixUrl: '',
        sequenceMode: true,
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
  }, [src, imageElRef, figureElRef]);

  const changeImage = (index) => {
    setActiveImage(index);
    showLoadIndicator();
    viewerRef.current.open({
      type: 'image',
      url: images[index].srcXl,
    });
    return null;
  };

  return (<div
    className="viewer"
    data-component="playground/viewer"
  >
    <figure
      ref={figureElRef}
      className={`zoom-image ${activeZoom ? 'has-active-zoom' : ''} ${isLoaded ? 'is-loaded' : ''}`}
    >
      <img
        ref={imageElRef}
        className="preload-image"
        src={src}
        alt={inventoryNumber}
      />
    </figure>

    <Async promiseFn={imageData.getArtefaktImages} inventoryNumber={inventoryNumber}>
      <Async.Loading>Loading...</Async.Loading>
      <Async.Fulfilled>
        {(data) => {
          images = data;
          return (
            <ul className="image-stripe-list">
              {data.map((image, index) => (
                <li onClick={() => changeImage(index)} key={image.srcXs} className={(index === activeImage) ? 'image-stripe-list__item is-active' : 'image-stripe-list__item'}>
                  <img src={image.srcXs} alt={image.altText} />
                </li>
              ))}
            </ul>
          );
        }}
      </Async.Fulfilled>
      <Async.Rejected>
        {error => `Something went wrong: ${error.message}`}
      </Async.Rejected>
    </Async>
  </div >);
};
