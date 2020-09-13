import React from 'react';

import Image from '~/components/atoms/image';
import Link from '~/components/atoms/link';

import './artefact-card.scss';

export default ({
  title = '',
  subtitle = '',
  date = '',
  to = '',
  imgSrc = '',
  imgAlt = '',
  classification = '',
}) => (
    <div
      className="artefact-card"
      data-component="molecules/artefact-card"
    >
      <div className="card-image">
        <Link
          to={to}
          triggersInternalTransition={true}
          internalTransitionDirection='left'
        >
          <Image
            src={imgSrc}
            alt={imgAlt}
            modifierWithBox={true}

          />
        </Link>
      </div>
      {title
        && (
          <div className="artefact-card__content">
            <Link
              to={to}
              triggersInternalTransition={true}
              internalTransitionDirection='left'
            >
              <h2 className="artefact-card__title">{title}, {date}</h2>
              <p className="artefact-card__subtitle">{classification}</p>
              <p className="artefact-card__subtitle">{subtitle}</p>
            </Link>
          </div>
        )
      }
    </div>
);
