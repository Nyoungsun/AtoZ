import React, { useState } from 'react';
import '../css/Result.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import searchBtn from '../searchBtn.png';
import axios from 'axios';

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [text, setText] = useState(location.state.text);

    const data = location.state.data;

    const params = { 'text': text };

    const reResult = () => {
        axios.post('search', null, { params: params })
            .then((res) => navigate('/result', {
                state: {
                    text: (text.includes('맛집')) ? text : text + '맛집',
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
                        <input id='ResultInput' value={text} onKeyDown={pressEnter} onChange={(e) => setText(e.target.value)} placeholder="'맛집'을 쓰지 않아도 검색돼요."/>
                    </div>
                    <button id='ResultSearchBtn' onClick={reResult} >
                        <img src={searchBtn} alt='검색'/>
                    </button>
                </div>
            </div>

            <div id='ContentWrap'>
                {
                    data.items && data.items.map((data) => (
                        <div className='content'>
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