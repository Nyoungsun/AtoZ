import React from 'react';

const items = ({items}) => {
    return (
        <div className='items'>
            <span className='loading'>필터링 중...</span>
            <a href={items.link} rel='noreferrer' target='_blank'><div className='title' dangerouslySetInnerHTML={{ __html: items.title }} /></a>
            <br />
            <hr />
            <br />
            <div className='description' dangerouslySetInnerHTML={{ __html: items.description }} />
        </div>
        );
    };

export default items;