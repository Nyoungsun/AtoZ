import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../css/main.module.css'
import logo from '../img/logo.png';
import searchBtn from '../img/searchBtn.png';
import loading from '../img/loading.png';

const Main = () => {
    const [query, setQuery] = useState('');

    const [isloading, setIsLoading] = useState(null);

    const navigate = useNavigate();

    const getItems = async () => {
        setIsLoading(true);

        const result = await axios.get(`/search?query=${query}&start=1`);
        const items = result.data.items;
        const total = result.data.total;

        setIsLoading(false);

        navigate('/result', { state: { query: query, items: items, total: total } });
    }

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            getItems();
        }
    };


    return (
        <div className={style.body}>
            <div className={style.logoDiv}>
                {
                    isloading ?
                        <div className={style.loadingDiv}>
                            <img src={loading} alt='loading' className={style.loading} />
                        </div> :
                        <img src={logo} alt='logo' />
                }
            </div>
            <div className={style.inputDiv}>
                <input className={style.input} onChange={(e) => setQuery(e.target.value)} onKeyDown={pressEnter} placeholder="검색어를 입력해보세요." />
                <button className={style.searchbtn} onClick={getItems}>
                    <img src={searchBtn} alt='검색' />
                </button>
            </div>
        </div>
    );
};

export default Main;