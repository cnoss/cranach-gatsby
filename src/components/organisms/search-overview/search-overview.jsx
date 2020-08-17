import React from 'react';

import './search-overview.scss';

export default ({
  isLoading,
  items,
}) => (
  <div
    className="search-overview"
    data-component="organisms/search-overview"
  >
    { isLoading }

    {isLoading && (<span>Loading...</span>)}
    {!isLoading && (<pre><code>{ JSON.stringify(items, null, 2) }</code></pre>)}
  </div>
);
