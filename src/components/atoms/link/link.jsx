import React from 'react';

import { Link as GatsbyLink } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';


export default ({
  children,
  to,
  activeClassName,
  partiallyActive,
  triggersInternalTransition = false,
  internalTransitionDirection = 'left',
  internalTransitionBgColor = '#000',
  ...other
}) => {
  /* See: https://www.gatsbyjs.org/docs/gatsby-link/#reminder-use-link-only-for-internal-links */
  const internal = /^\/(?!\/)/.test(to);

  if (internal) {
    return triggersInternalTransition
      ? (
        <AniLink
          swipe
          bg={ internalTransitionBgColor }
          direction={ internalTransitionDirection }
          to={to}
          duration={0.4}
          bg="#ffffff"
          { ...other }
          data-component="atoms/link"
        >
          { children }
        </AniLink>
      )
      : (
        <GatsbyLink
          to={ to }
          activeClassName={ activeClassName }
          partiallyActive={ partiallyActive }
          { ...other }
          data-component="atoms/link"
        >
          { children }
        </GatsbyLink>
      );
  }
  return (
    <a
      href={ to }
      { ...other }
      data-component="atoms/link"
    >
      { children }
    </a>
  );
};
