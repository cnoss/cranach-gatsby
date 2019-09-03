import React from 'react';
import { Link } from 'gatsby';

import Image from '~/components/atoms/image';

import './graphic-card.scss';

export default ({
  title = '',
  subtitle = '',
  href = '',
  imgSrc = '',
  imgAlt = '',
}) => (
  <div
    className="graphic-card card bm--card-equal-height"
  >
    <div className="card-image">
      <Link
        to={ href }
      >
        <Image
          src={ imgSrc }
          alt={ imgAlt }
        ></Image>
      </Link>
    </div>

    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <h2 className="title is-6">{ title }</h2>
          <p>{ subtitle }</p>
        </div>
      </div>
    </div>
  </div>
);
