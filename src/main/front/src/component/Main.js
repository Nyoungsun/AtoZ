import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Main.css';
import logo from '../img/logo.png';
import searchBtn from '../img/searchBtn.png';

const Home = () => {
    const navigate = useNavigate();

    const [text, setText] = useState('');

    const params = { 'text': text };

    const onText = (e) => {
        setText(e.target.value);
    };


    const goResult = () => {
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
            goResult();
        }
    };

    return (
        <div>
            <div id='MainlogoDiv'>
                <img src={logo} alt='logo' />
            </div>

            <div id='MainSearchDiv'>
                <input id='MainInput' onChange={onText} onKeyDown={pressEnter} placeholder="검색어를 입력해보세요." />
                <button id='MainSearchBtn' onClick={goResult}>
                    <img src={searchBtn} alt='검색' />
                </button>
            </div>
        </div>
    );
};

export default Home;