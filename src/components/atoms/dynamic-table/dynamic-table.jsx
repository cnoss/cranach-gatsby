import React from 'react';

import './dynamic-table.scss';

export default ({ columns, data = [] }) => {
  const rowEls = data.map((row, idx) => {
    const tdEls = columns.reduce((acc, column) => {
      const cellClassName = `cell ${column.centered ? '-center' : ''}`;
      const columnEl = (row[column.field])
        ? (<td className={cellClassName} key={ column.field }>{ row[column.field] }</td>)
        : (<td className={cellClassName} key={ column.field }></td>);

      acc.push(columnEl);

      return acc;
    }, []);

    return (<tr className="row" key={ idx }>{ tdEls }</tr>);
  });

  return (<div
    className="dynamic-table"
    data-component="atoms/dynamic-table"
  >
    <table className="table">
      { columns
        && <thead className="head">
          <tr className="row">
            { columns.map(column => (
              <th className="cell" key={ column.field }>{ column.title || '' }</th>
            ))
            }
          </tr>
        </thead>
      }
      <tbody className="body">
        { rowEls }
      </tbody>
    </table>
  </div>);
};
