import React, { useEffect, useState } from 'react';
import '../css/Result.css'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.png';
import searchBtn from '../searchBtn.png';

const Result = () => {

    const [text, setText] = useState(useLocation().state.text);

    const [data, setData] = useState([]);

    const params = { 'text': text };

    const onText = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        axios.post('/search', null, { params: params })
            .then((res) => setData(res.data))
    }, [])

    return (
        <div id='body'>
            <div id='wrap'>
               <Link to='/'><img id='logo' src={logo} alt='logo'/></Link>
                <div id='ResultSearchDiv'>
                    <input id='ResultInput' value={text} onChange={onText} />
                </div>

                <button id='ResultSearchBtn'>
                    <img src={searchBtn} alt='검색' />
                </button>
            </div>

            <div id='ContentWrap'>
                {
                    data.items && data.items.map((data) => (
                        <div className='content'>
                            <span className='loading'>필터링 중...</span>
                            <a href='#'><div className='title' dangerouslySetInnerHTML={{ __html: data.title }} /></a>
                            <br />
                            <hr />
                            <br />
                            <div className='description' dangerouslySetInnerHTML={{ __html: data.description }} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Result;