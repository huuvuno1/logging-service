import { debounce } from 'lodash';
import React, { useRef } from 'react';
import './index.scss'

function InputFilter(props) {
  const { placeholder, name, onChange } = props

  return (
    <div className="filter__search-box__item">
      <div className="decor_placeholder">
        &gt;_
      </div>
      <input type="text" 
        className="filter_input" 
        placeholder={ placeholder } 
        onChange={(e) => onChange(e.target.value, name)}
      />
    </div>
  );
}

export default InputFilter;