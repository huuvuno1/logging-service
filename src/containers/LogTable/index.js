import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import './index.scss'
import { change } from './logTableSlice';

function LogTable(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.logs.value)
  const totalFound = useSelector(state => state.logs.totalFound)
  const currentPage = useSelector(state => state.logs.currentPage)
  const totalPage = (totalFound % 20 === 0) ? totalFound/20 : totalFound/20 + 1

  const handlePageClick = (page_num) => {
    console.log(page_num)
    dispatch(change({
      currentPage: page_num
    }))
  }
  
  return (
    <div className="log__content">
      <div className='log__overview'>
        <div className='log__results--count'>{ totalFound } results found</div>
        <Pagination 
          current={currentPage} 
          total={totalPage} 
          length={5} 
          handleClick={handlePageClick} 
        />
      </div>
      <Table data={data} />
    </div>
  );
}

export default LogTable;