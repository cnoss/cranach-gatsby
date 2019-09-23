import React from 'react';

import { Link as GatsbyLink } from 'gatsby';


export default ({
  children,
  to,
  activeClassName,
  partiallyActive,
  ...other
}) => {
  /* See: https://www.gatsbyjs.org/docs/gatsby-link/#reminder-use-link-only-for-internal-links */
  const internal = /^\/(?!\/)/.test(to);

  if (internal) {
    return (
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
