import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import searchBtn from '../img/searchBtn.png';
import loading from '../img/loading.png';
import Swal from "sweetalert2";
import style from '../css/main.module.css'
import styleM from '../css/mainM.module.css'

const Main = (props) => {

    const isTabletOrMobile = props.isTabletOrMobile;

    const [query, setQuery] = useState('');

    const [isLoading, setIsLoading] = useState(null);

    const navigate = useNavigate();

    const getItems = async () => {
        if (query === '' ) {
            Swal.fire({
                icon: 'warning',
                text: '검색어를 입력해주세요.',
                showCancelButton: false,
                confirmButtonText: "확인",
                confirmButtonColor: '#1564A8'
            })
        } else {
            setIsLoading(true);

            const result = await axios.get(`/search?query=${query}&start=1`);
            const items = result.data.items;
            const total = result.data.total;

            setIsLoading(false);

            navigate('/result', { state: { query: query, items: items, total: total } });
        }
    }

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            getItems();
        }
    };


    return (
        <div>
            {
                isTabletOrMobile

                    ?

                    <div className={styleM.body}>
                        <div className={styleM.logoDiv}>
                            {
                                isLoading ?
                                    <div className={styleM.loadingDiv}>
                                        <img src={loading} alt='loading' className={styleM.loading} />
                                    </div> :
                                    <img src={logo} alt='logo' />
                            }
                        </div>
                        <div className={styleM.inputDiv}>
                            <input className={styleM.input} onChange={(e) => setQuery(e.target.value)} onKeyDown={pressEnter} placeholder="검색어를 입력해보세요." />
                            <button className={styleM.searchbtn} onClick={getItems}>
                                <img src={searchBtn} alt='검색' />
                            </button>
                        </div>
                    </div>

                    :

                    <div className={style.body}>
                        <div className={style.logoDiv}>
                            {
                                isLoading ?
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
            }
        </div>
    );
};

export default Main;