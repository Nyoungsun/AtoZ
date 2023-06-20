import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import searchBtn from '../img/searchBtn.png';
import '../css/Result.css'
import axios from 'axios';

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [text, setText] = useState(location.state.text);

    const data = location.state.data;

    console.log(data)

    const params = { 'text': text };

    const reResult = () => {
        axios.post('search', null, { params: params })
            .then((res) => navigate('/result', {
                state: {
                    text: text,
                    data: res.data
                }
            }))
    };

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            reResult();
        }
    };

    return (
        <div id='body'>
            <div id='wrap'>
                <div id='wrapContent'>
                    <Link to='/'><img id='logo' src={logo} alt='logo' /></Link>
                    <div id='ResultSearchDiv'>
                        <input id='ResultInput' value={text} onKeyDown={pressEnter} onChange={(e) => setText(e.target.value)} placeholder="검색어를 입력해보세요." />
                    </div>
                    <button id='ResultSearchBtn' onClick={reResult} >
                        <img src={searchBtn} alt='검색' />
                    </button>
                </div>
            </div>

            <div id='ContentWrap'>
                {
                    data.items && data.items.map((data, index) => (
                        <div key={index} className='content'>
                            <span className='loading'>필터링 중...</span>
                            <Link to={data.link}><div className='title' dangerouslySetInnerHTML={{ __html: data.title }} /></Link>
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