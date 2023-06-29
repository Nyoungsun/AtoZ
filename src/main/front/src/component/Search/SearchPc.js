import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../css/Search/SearchP.module.css';

const SearchPc = (props) => {

    const pressEnter = props.pressEnter;
    const getNewItems = props.getNewItems;
    const query = props.query;
    const onQuery = props.onQuery;
    const isloading = props.isloading;

    return (
        <div>
            <div className={style.body}>
                <div className={style.wrap}>
                    <Link to='/' onClick={() => (window.scrollTo({ top: 0 }))}>
                        {
                            isloading ?
                                <img className={style.loading} src='/img/loading.png' alt='logo' /> :
                                <img className={style.logo} src='/img/logo.png'  alt='logo' />
                        }
                    </Link>
                    <div className={style.inputDiv}>
                        <input className={style.input} onKeyDown={pressEnter} value={query} onChange={onQuery} placeholder='네이버 블로그 글을 검색해보세요.' />
                    </div>
                    <button className={style.btn} onClick={getNewItems}>
                        <img src='/img/search.png' alt='검색' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchPc;