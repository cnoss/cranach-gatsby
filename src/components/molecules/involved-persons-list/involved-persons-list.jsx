import React from 'react';

import './involved-persons-list.scss';

export default ({
  data = [],
}) => (
    <ul
      className="involved-persons-list">
      {data.map(item => (
        <li
          className="involved-persons-list__item">
          {item.alternativeName}, {item.role} {(item.remarks) ? <span className="remarks">{item.remarks}</span> : ''}
        </li>))
      }
    </ul>);
