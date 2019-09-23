import React from 'react';

import Image from '~/components/atoms/image';
import Link from '~/components/atoms/link';

import './graphic-card.scss';

export default ({
  title = '',
  subtitle = '',
  to = '',
  imgSrc = '',
  imgAlt = '',
}) => (
  <div
    className="graphic-card card"
    data-component="molecules/graphic-card"
  >
    <div className="card-image">
      <Link
        to={ to }
      >
        <Image
          src={ imgSrc }
          alt={ imgAlt }
        ></Image>
      </Link>
    </div>
    { title
      && (<div className="card-content">
        <div className="media">
          <div className="media-content">
            <h2 className="title is-6">{ title }</h2>
            <p className="content-subtitle">{ subtitle }</p>
          </div>
        </div>
      </div>)
    }
  </div>
);
