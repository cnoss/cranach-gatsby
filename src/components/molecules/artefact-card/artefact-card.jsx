import React from 'react';

import Image from '~/components/atoms/image';
import Link from '~/components/atoms/link';

import './artefact-card.scss';

export default ({
  title = '',
  subtitle = '',
  text = '',
  to = '',
  imgSrc = '',
  imgAlt = '',
}) => (
  <div
    className="artefact-card"
    data-component="molecules/artefact-card"
  >
    <div className="card-image">
      <Link
        to={ to }
        triggersInternalTransition={ true }
        internalTransitionDirection='left'
      >
        <Image
          src={ imgSrc }
          alt={imgAlt}
          additionalClass="-has-box"
        />
      </Link>
    </div>
    { title
      && (<div className="card-content">
        <h2 className="card-title">{ title }</h2>
        <h3 className="card-subtitle">{ subtitle }</h3>
        <p className="card-text">{ text }</p>
      </div>)
    }
  </div>
);
