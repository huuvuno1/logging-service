import React, { useEffect, useState } from 'react';
import './index.scss'

function Pagination(props) {
    const { current, total, length, handleClick } = props

    const calcStart = () => {
        return (current % length === 0) ? current - length + 1 : current - (current % length) + 1
    }

    const [start, setStart] = useState(calcStart())

    useEffect(() => {
        const p_start = calcStart()
        setStart(p_start)
    }, [current])

    const components = []
    const end = (total - start < length) ? total : (start + length - 1)

    for (let i = start; i <= end; i++) {
        components.push(
        <div 
            key={i} 
            className={`page_num ${i === current ? 'highlight' : ''}`}
            onClick={ () => i !== current && handleClick(i) }
        >
            { i }
        </div>)
    }


    return (
        <div className='pagination'>
            <div 
                className={`page_num ${start === 1 ? 'none' : ''}`} 
                onClick={() => handleClick(start - 1)}
            >&lt;</div>
            {
                components
            }
            <div 
                className={`page_num ${end === total ? 'none' : ''}`} 
                onClick={() => handleClick(end + 1)}
            >&gt;</div>
        </div>
    );
}

export default Pagination;