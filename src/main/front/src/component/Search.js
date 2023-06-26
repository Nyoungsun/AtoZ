import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import searchBtn from '../img/searchBtn.png';
import style from '../css/search.module.css';
import styleM from '../css/searchM.module.css';
import loading from '../img/loading.png'

const Search = (props) => {

    const isTabletOrMobile = props.isTabletOrMobile;

    const pressEnter = props.pressEnter;
    const getNewItems = props.getNewItems;
    const query = props.query;
    const onQuery = props.onQuery;
    const isloading = props.isloading;

    return (
        <>
            {
                isTabletOrMobile ?
                    <div className={styleM.body}>
                        <div className={styleM.wrap}>
                            <Link to='/' onClick={() => (window.scrollTo({ top: 0 }))}>
                                {isloading ? <img className={styleM.loading} src={loading} alt='logo' /> :
                                    <img className={styleM.logo} src={logo} alt='logo' />
                                }
                            </Link>
                            <div className={styleM.inputDiv}>
                                <input className={styleM.input} onKeyDown={pressEnter} value={query} onChange={onQuery} placeholder='검색어를 입력해보세요.' />
                            </div>
                            <button className={styleM.btn} onClick={getNewItems}>
                                <img src={searchBtn} alt='검색' />
                            </button>
                        </div>
                    </div>
                    :
                    <div className={style.body}>
                        <div className={style.wrap}>
                            <Link to='/' onClick={() => (window.scrollTo({ top: 0 }))}>
                                {isloading ? <img className={style.loading} src={loading} alt='logo' /> :
                                    <img className={style.logo} src={logo} alt='logo' />
                                }
                            </Link>
                            <div className={style.inputDiv}>
                                <input className={style.input} onKeyDown={pressEnter} value={query} onChange={onQuery} placeholder='검색어를 입력해보세요.' />
                            </div>
                            <button className={style.btn} onClick={getNewItems}>
                                <img src={searchBtn} alt='검색' />
                            </button>
                        </div>
                    </div>
            }
        </>
    );
};

export default Search;