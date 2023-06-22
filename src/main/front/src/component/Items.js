import React from 'react';
import { Link } from 'react-router-dom';

const items = ({items}) => {
    return (
        <div className='items'>
            <span className='loading'>필터링 중...</span>
            <Link to={items.link}><div className='title' dangerouslySetInnerHTML={{ __html: items.title }} /></Link>
            <br />
            <hr />
            <br />
            <div className='description' dangerouslySetInnerHTML={{ __html: items.description }} />
        </div>
        );
    };

export default items;