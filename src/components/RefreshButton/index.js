import React from 'react';
import './index.scss'

function RefreshButton(props) {
  const { onClick } = props
  
  return (
    <div className="filter__search-box__btn-refresh"
      onClick={ onClick }
    >
      <i className="bx bx-refresh" />
      <h4>Refresh</h4>
    </div>
  );
}

export default RefreshButton;