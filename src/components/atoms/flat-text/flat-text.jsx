import React from 'react';

import './flat-text.scss';

export default ({
  text,
}) => (
  <p
    className="flat-text"
  >
    { text && text.split('\n').map((item, i) => <span key={i}>{ item || '\u200B' }</span>) }
  </p>
);
