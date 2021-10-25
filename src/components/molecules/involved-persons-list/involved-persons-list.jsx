import React from 'react';

import './involved-persons-list.scss';

export default ({
  data = [],
}) => {
  const getInvolvedPersonName = (item) => [
    item.prefix,
    item.alternativeName,
    item.suffix,
  ].filter((str) => str.length > 0).join(' ');

  const items = data.map(
    (item, idx) => (
      <li className="involved-persons-list__item" key={idx}>
        {`${getInvolvedPersonName(item)} (${item.role}) `}
        {(item.remarks) ? <span className="remarks">{item.remarks}</span> : ''}
      </li>
    ),
  );
  return (
    <ul
      className="involved-persons-list">
      {items}
    </ul>);
};
