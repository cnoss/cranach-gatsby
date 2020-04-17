import React from 'react';

import './image.scss';

export default ({
  src,
  alt,
  caption,
  classNamePrefix,
  modifier,
}) => (
  <figure
    className={`${classNamePrefix ? `${classNamePrefix} image${modifier}` : `image${modifier}`}`}
    data-component="atoms/image"
    >
      <div
        className="image__holder"
      >
        <img
          src={src}
          alt={alt}
        ></img>
      </div>

    { caption && <figcaption
        className= {`${classNamePrefix ? `${classNamePrefix} image__caption` : 'image__caption'}`}
      >
        <p className="text">{ caption }</p>
      </figcaption>
    }
  </figure>
);
