import React from 'react';

import Image from '~/components/atoms/image';
import Link from '~/components/atoms/link';

import './artefact-line.scss';

export default ({
  title = '',
  subtitle = '',
  date = '',
  to = '',
  additionalInfoList = [],
  imgSrc = '',
  imgAlt = '',
}) => (
    <div
      className="artefact-line"
      data-component="molecules/artefact-line"
    >
      <div className="artefact-line__image">
        <Link
          to={to}
          triggersInternalTransition={true}
          internalTransitionDirection='left'
        >
          <Image
            src={imgSrc}
            alt={imgAlt}
            modifierWithBox={true} // -has-box artefact-line-image
          />
        </Link>
      </div>

      <div className="artefact-line__content">
        <Link
          to={to}
          triggersInternalTransition={true}
          internalTransitionDirection='left'
        >
          <h2 className="artefact-line__title">{title}, {date}</h2>
          <h3 className="artefact-line__subtitle">{subtitle}</h3>
          <ul className="artefact-line__master-data">
            {
              additionalInfoList.map((datalistItem, i) => (<li key={ i }>{ datalistItem }</li>))
            }
          </ul>
        </Link>
      </div>

    </div>
);
