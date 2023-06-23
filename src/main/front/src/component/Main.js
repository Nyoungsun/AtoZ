import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Main.css';
import logo from '../img/logo.png';
import searchBtn from '../img/searchBtn.png';

const Main = () => {
    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    const getItems = async() => {
        const result = await axios.get(`/search?query=${query}&start=1`);
        const items = result.data.items;
        const total = result.data.total;
        navigate('/result', {state: {query:query, items: items, total: total}});
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
                <input id='MainInput' onChange={(e) => setQuery(e.target.value)} onKeyDown={pressEnter} placeholder="검색어를 입력해보세요." />
                <button id='MainSearchBtn' onClick={getItems}>
                    <img src={searchBtn} alt='검색' />
                </button>
            </div>
        </div>
    );
};

export default Main;