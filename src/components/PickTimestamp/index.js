import React from 'react';
import './index.scss'

function PickTimestamp(props) {
  const { label, id, onChange } = props

  return (
    <div className="filter__header--time-item">
      <label htmlFor={ id }>{ label }</label>
      <input type="datetime-local" id={ id } name={ id }
        onChange={ (e) => onChange(e, id) }
      />
    </div>
  );
}

export default PickTimestamp;