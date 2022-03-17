import React from 'react';
import './index.scss'

function Table(props) {
  const { data } = props

  return (
    <table className="log__list">
      <thead>
        <tr>
          <th>
            <div className="log__list--header cursor-pointer">
              <h3>Time</h3>
              <i className="bx bx-sort-alt-2" />
            </div>
          </th>
          <th>
            <div className="log__list--header cursor-pointer">
              <h3>Level</h3>
              <i className="bx bx-sort-alt-2" />
            </div>
          </th>
          <th>
            <div className="log__list--header cursor-pointer">
              <h3>Service</h3>
              <i className="bx bx-sort-alt-2" />
            </div>
          </th>
          <th>
            <div className="log__list--header">
              <h3>Message</h3>
            </div>
          </th>
          <th>
            <div className="log__list--header">
              <h3>Detail</h3>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((value, index) => {
            const { timestamp, level, service, message, meta } = value

            return (
              <tr key={ index }>
                <td className="log__timestamp">{ new Date(timestamp).toLocaleString() }</td>
                <td className={ `log__level ${level}` }>{ level }</td>
                <td className="log__service">{ service }</td>
                <td className="log__message">{ message }</td>
                <td className="log__detail">{ meta }</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default Table;