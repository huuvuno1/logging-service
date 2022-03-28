import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { debounce } from 'lodash'
import { Select } from 'antd';
import logApiV1 from '../../api/v1/logApi';
import logApiV2 from '../../api/v2/logApi';
import InputFilter from '../../components/InputFilter';
import PickTimestamp from '../../components/PickTimestamp';
import RefreshButton from '../../components/RefreshButton';
import { change } from '../LogTable/logTableSlice';
import './index.scss'
const { Option } = Select;

function Filter(props) {
    const dispatch = useDispatch()
    const [ totalRecord, setTotalRecord] = useState(0)
    const [ timeStart, setTimeStart ] = useState(0)
    const [ timeEnd, setTimeEnd ] = useState(0)
    const [ message, setMessage ] = useState('')
    const [ service, setService ] = useState('')
    const [ services, setServices ] = useState([])
    const [ level, setLevel ] = useState('')
    const [ timeQuery, setTimeQuery ] = useState(0)
    const currentPage = useSelector(state => state.logs.currentPage)

    const handleQuery = async () => {
      const params = {
        time_end: timeEnd,
        time_start: timeStart,
        page: currentPage,
        q: message,
        service,
        level
      }
      const data = localStorage.getItem('api_version') === 'api_v1' ? await logApiV1.filter(params) : await logApiV2.filter(params)
    
      setTimeQuery(data.meta.took)

      setTotalRecord(data.data.totalCount)
      dispatch(change({
        totalResult: data.data.totalResult,
        totalFound: data.data.totalCount,
        currentPage: currentPage
      }))
    }

    useEffect(() => {
      handleQuery()
    }, [timeStart, timeEnd, message, currentPage, service, level])

    // fetch list service
    useEffect(() => {
      const fetchData = async () => {
        const services = await logApiV1.fetchListService()
        setServices(services)
      }

      fetchData()
    }, [])

    const handleTimestampChange = (e, id) => {
      const timestamp = new Date(e.target.value).getTime()
      if (id === 'time_start') {
        setTimeStart(timestamp)
      } else {
        setTimeEnd(timestamp)
      }
    }

    const debounceTextInput = useCallback(debounce((message) => {
      setMessage(message)
    }, 300), [])

    const handleSearchChange = (value) => {
      debounceTextInput(value)
    }

    const refreshHandle = () => {
      handleQuery(dispatch)
    }

    const onChange = (value, name) => {
      name === 'service' ? setService(value) : setLevel(value)
    }

    const toggleVersionAPI = value => {
      if (value)
        localStorage.setItem('api_version', 'api_v2')
      else
        localStorage.setItem('api_version', 'api_v1')
    }

    return (
      <div className="filter">
        <div className="filter__header">
          <div className="filter__head--count">
          <Switch 
            onChange={toggleVersionAPI}
            checkedChildren="api v2" 
            unCheckedChildren="api v1" 
            size='defalt'
            defaultChecked={localStorage.getItem('api_version') !== 'api_v1'}
            />
          </div>
          <div className="filter__header--time">
            <PickTimestamp id='time_start' label='Start time' onChange={ handleTimestampChange } />
            <PickTimestamp id='time_end' label='End time' onChange={ handleTimestampChange } />
          </div>
        </div>
        <div className="filter__search-box">
          <div className="filter__search-box__input">
             <InputFilter onChange={ handleSearchChange } placeholder='Filter by message' />
          </div>
          <RefreshButton onClick={refreshHandle} />
        </div>
        
        <div className='flex space-between'>
          <div className='filter__select'>
            <Select
                showSearch
                className='filter__select--item'
                placeholder="Select a service"
                optionFilterProp="children"
                onChange={(value) => onChange(value, 'service')}
                size={'large'}
                allowClear
                autoClearSearchValue={true}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  services.map((value, key) => <Option value={value} key={key} >{value}</Option>)
                }
                
              </Select>
            <Select
              showSearch
              placeholder="Select a level"
              className='filter__select--item'
              optionFilterProp="children"
              onChange={(value) => onChange(value, 'level')}
              size={'large'}
              allowClear
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="ERROR">ERROR</Option>
              <Option value="WARN">WARN</Option>
              <Option value="FATAL">FATAL</Option>
              <Option value="INFO">INFO</Option>
              <Option value="DEBUG">DEBUG</Option>
              <Option value="TRACE">TRACE</Option>
            </Select>
          </div>
          <h1 className='time__query'> Query time: { timeQuery }ms </h1>
        </div>
      </div>
    );
}

export default Filter;