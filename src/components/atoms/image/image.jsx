import React from 'react';

import './image.scss';

export default ({
  src,
  alt,
  caption,
  classNamePrefix,
}) => (
  <figure
    className={`${classNamePrefix ? `${classNamePrefix}-image` : 'image'}`}
    data-component="atoms/image"
    >
      <div
        className={`${classNamePrefix ? `${classNamePrefix}-image-holder` : 'image-holder'}`}
      >
        <img
          src={src}
          alt={alt}
        ></img>
      </div>

    { caption && <figcaption
        className= {`${classNamePrefix ? `${classNamePrefix}-image-caption` : 'image-caption'}`}
      >
        <p className="text">{ caption }</p>
      </figcaption>
    }
  </figure>
);
