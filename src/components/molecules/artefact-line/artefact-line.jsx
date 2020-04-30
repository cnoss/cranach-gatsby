import React from 'react';

import Image from '~/components/atoms/image';
import Link from '~/components/atoms/link';

import './artefact-line.scss';

export default ({
  title = '',
  subtitle = '',
  text = '',
  to = '',
  imgSrc = '',
  imgAlt = '',
}) => (
  <div
    className="artefact-line"
    data-component="molecules/artefact-line"
  >
    <span>
      <Link
        to={ to }
        triggersInternalTransition={ true }
        internalTransitionDirection='left'
      >
        <Image
          src={ imgSrc }
          alt={ imgAlt }
          additionalClass="-has-box artefact-line-image"
        />
      </Link>
    </span>
    <span className="line-content">
      <span className="line-title">{ title }</span>
      <span className="line-subtitle">{ subtitle }</span>
      <span className="line-text">{ text }</span>
    </span>
  </div>
);
