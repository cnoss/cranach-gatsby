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
          alt={ imgAlt }
          modifier="--with-box"

        />
      </Link>
    </div>
    { title
      && (<div className="artefact-card__content">
        <h2 className="artefact-card__title">{ title }</h2>
        <h3 className="artefact-card__subtitle">{ subtitle }</h3>
        <p className="artefact-card__text">{ text }</p>
      </div>)
    }
  </div>
);
