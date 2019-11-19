import React from 'react';

import Link from '~/components/atoms/link';
import Image from '~/components/atoms/image';

import './graphics-list.scss';

export default ({
  items,
}) => (
  <div
    className="graphics-list"
    data-component="molecules/graphics-list"
  >
    <div className="columns is-multiline">
      {
        items.map(
          item => <div
            key={ item.imgSrc }
            className="column is-one-quarter graphic-item"
          >
            <Link to={ item.to }>
              <Image
                src={ item.imgSrc }
                alt={ item.title }
              ></Image>
            </Link>
            <p className="title">{ item.title }</p>
          </div>,
        )
      }
    </div>
  </div>
);
