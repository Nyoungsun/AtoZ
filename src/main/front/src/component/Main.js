import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Main.css';
import logo from '../logo.png';
import searchBtn from '../searchBtn.png';

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
                <input id='MainInput' onChange={onText} onKeyDown={pressEnter} placeholder="'맛집'을 쓰지 않아도 검색에 포함돼요. " />
                <button id='MainSearchBtn' onClick={goResult}>
                    <img src={searchBtn} alt='검색' />
                </button>
            </div>
        </div>
    );
};

export default Home;