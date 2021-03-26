import React from 'react';

import './dynamic-table.scss';

export default ({
  columns,
  data = [],
  showHead = true,
}) => {
  const rowEls = data.map((row, idx) => {
    const tdEls = columns.reduce((acc, column) => {
      const cellClassName = `cell ${column.centered ? '-center' : ''}`;
      const columnEl = (
        <td
          className={cellClassName}
          data-field={ column.field }
          key={ column.field }
        >
          { row[column.field] || '' }
        </td>
      );

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
      { showHead && columns
        && <thead className="head">
          <tr className="row">
            { columns.map((column) => (
              <th
                className='cell'
                data-field={ column.field }
                key={ column.field }
              >
                { column.title || '' }
              </th>
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
