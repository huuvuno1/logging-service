import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash'
import logApi from '../../api/logApi';
import InputFilter from '../../components/InputFilter';
import PickTimestamp from '../../components/PickTimestamp';
import RefreshButton from '../../components/RefreshButton';
import { change } from '../LogTable/logTableSlice';
import './index.scss'

function Filter(props) {
    const dispatch = useDispatch()
    const [ totalRecord, setTotalRecord] = useState(0)
    const [ timeStart, setTimeStart ] = useState(0)
    const [ timeEnd, setTimeEnd ] = useState(0)
    const [ search, setSearch ] = useState([])
    const currentPage = useSelector(state => state.logs.currentPage)
    const totalFound = useSelector(state => state.logs.totalFound)

    useEffect(() => {
      setSearch([
          {
              name: 'q',
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


    const handleQuery = async () => {
      /*
        inputSearch: {
          message: 'xxx',
          service: 'xxx',
          level: 'xxx'
        }
      */
      const inputSearch = search.reduce((prev, curr) => {
        prev[curr.name] = curr.value
        return prev
      }, {})

      const data = await logApi.filter({
        time_end: timeEnd,
        time_start: timeStart,
        ...inputSearch,
        page: currentPage
      })

      setTotalRecord(data.data.totalCount)
      dispatch(change({
        totalResult: data.data.totalResult,
        totalFound: data.data.totalCount,
        currentPage: currentPage
      }))
    }

    useEffect(handleQuery, [timeStart, timeEnd, search, currentPage])

    const handleTimestampChange = (e, id) => {
      const timestamp = new Date(e.target.value).getTime()
      if (id === 'time_start') {
        setTimeStart(timestamp)
      } else {
        setTimeEnd(timestamp)
      }
    }

    const debounceTextInput = useCallback(debounce((search) => {
      setSearch([...search])
    }, 300), [])

    const handleSearchChange = (value, name) => {
      const data = search.map(item => {
        if (item.name === name)
          item.value = value
        return item
      })

      debounceTextInput(data)
    }

    const refreshHandle = () => {
      handleQuery(dispatch)
    }

    return (
        <div className="filter">
        <div className="filter__header">
          <div className="filter__head--count" style={{visibility: 'hidden'}}>
            { totalRecord } records
          </div>
          <div className="filter__header--time">
            <PickTimestamp id='time_start' label='Time start' onChange={ handleTimestampChange } />
            <PickTimestamp id='time_end' label='Time end' onChange={ handleTimestampChange } />
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