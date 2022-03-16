import React, { useEffect, useState } from 'react';
import InputFilter from '../../components/InputFilter';
import PickTimestamp from '../../components/PickTimestamp';
import RefreshButton from '../../components/RefreshButton';
import './index.scss'

function Filter(props) {
    const refreshHandle = () => {
        alert('refresh')
    }

    const [ timeStart, setTimeStart ] = useState(0)
    const [ timeEnd, setTimeEnd ] = useState(0)
    const [ search, setSearch ] = useState([])

    useEffect(() => {
        setSearch([
            {
                name: 'message',
                placeholder: 'Filter by message',
                value: ''
            },
            {
                name: 'service',
                placeholder: 'Filter by service',
                value: ''
            },
            {
                name: 'level',
                placeholder: 'Filter by level',
                value: ''
            }
        ])
    }, [])


    const handleTimestampChange = (e, id) => {
      console.log(id, e.target.value)
    }

    const handleSearchChange = (e, name) => {
      const data = search.map(item => {
        if (item.name === name)
          item.value = e.target.value
        return item
      })

      setSearch(data)
    }


    return (
        <div className="filter">
        <div className="filter__header">
          <div className="filter__head--count">
            100000 records
          </div>
          <div className="filter__header--time">
            <PickTimestamp id='timeStart' label='Time start' onChange={ handleTimestampChange } />
            <PickTimestamp id='timeEnd' label='Time end' onChange={ handleTimestampChange } />
          </div>
        </div>
        <div className="filter__search-box">
          <div className="filter__search-box__input">
            {
                search.map((value, index) => <InputFilter onChange={ handleSearchChange } key={index} {...value} />)
            }
          </div>
          
          <RefreshButton onClick={refreshHandle} />
        </div>
      </div>
    );
}

export default Filter;