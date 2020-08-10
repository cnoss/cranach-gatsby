import React from 'react';

import './involved-persons-list.scss';

export default ({
  data = [],
}) => {
  const items = data.map(
    (item, idx) => (
      <li className="involved-persons-list__item" key={idx}>
        {item.alternativeName}, {item.role} {(item.remarks) ? <span className="remarks">{item.remarks}</span> : ''}
      </li>
    ),
  );
  return (
    <ul
      className="involved-persons-list">
      {items}
    </ul>);
};
