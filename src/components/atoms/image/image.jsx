import React from 'react';

import './image.scss';

export default ({
  src,
  alt,
  caption,
}) => (
  <figure
    className="image"
    data-component="atoms/image"
  >
    <img
      src={ src }
      alt={ alt }
    ></img>

    { caption && <figcaption
        className="image-caption"
      >
        <p className="text">{ caption }</p>
      </figcaption>
    }
  </figure>
);
