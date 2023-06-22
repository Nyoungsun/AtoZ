import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Main.css';
import logo from '../img/logo.png';
import searchBtn from '../img/searchBtn.png';

const Main = () => {
    const [text, setText] = useState('');

    const onText = (e) => {
        setText(e.target.value);
    };

    const params = { 
        'text': text,
        'start': 1 //첫 검색은 1번글부터 10번글까지 (10개씩)
    };

    const navigate = useNavigate();

    const getItems = async() => {
        const response = await axios.post('search', null, {params: params});
        const items = response.data.items;
        navigate('/result', {state: {text:text, items: items}});
    }

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            getItems();
        }
    };

    return (
        <div>
            <div id='MainlogoDiv'>
                <img src={logo} alt='logo' />
            </div>

            <div id='MainSearchDiv'>
                <input id='MainInput' onChange={onText} onKeyDown={pressEnter} placeholder="검색어를 입력해보세요." />
                <button id='MainSearchBtn' onClick={getItems}>
                    <img src={searchBtn} alt='검색' />
                </button>
            </div>
        </div>
    );
};

export default Main;