import React from 'react';

import Link from '~/components/atoms/link';
import Image from '~/components/atoms/image';

import './graphics-list.scss';

export default ({
  items,
  onItemClick,
}) => (
    <ul
      className="graphics-list"
      data-component="molecules/graphics-list"
    >
      {
        items.map(
          (item) => <li
            key={item.inventoryNumber}
            className="graphics-list-item"
          >

            <Link
              to={item.to}
              triggersInternalTransition={!!item.triggersInternalTransition}
              onClick={(e) => {
                if (item.preventLinkFollowing) {
                  if ((typeof onItemClick) === 'function') {
                    onItemClick(item);
                  }
                  e.preventDefault();
                  return false;
                }

                return true;
              }}
            >
              <Image
                src={item.imgSrc}
                alt={item.title}
                classNamePrefix={'graphics-list-item__image'}
                caption={item.title}
                modifierWithBox={true}
              />
            </Link>
          </li>,
        )
    }
  </ul >);
