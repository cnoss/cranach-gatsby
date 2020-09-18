import React, { useState } from 'react';

import './text-input.scss';

export default ({
  label = '',
  className = '',
  value = useState(''),
}) => (
  <label
    className={ `text-input ${className}` }
    data-component="atoms/text-input"
  >
    <input type="text" className="input-field" value={ value[0] } onChange={ (e) => { value[1](e.target.value); } } />
    { label
      && <span className="label-text">{ label }</span>
    }
  </label>
);
