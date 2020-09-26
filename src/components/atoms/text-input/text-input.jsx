import React from 'react';

import './text-input.scss';

export default ({
  label = '',
  className = '',
  value = '',
  onChange = () => {},
}) => (
  <label
    className={ `text-input ${className}` }
    data-component="atoms/text-input"
  >
    <input type="text" className="input-field" value={ value } onChange={ (e) => { onChange(e.target.value); } } />
    { label
      && <span className="label-text">{ label }</span>
    }
  </label>
);
