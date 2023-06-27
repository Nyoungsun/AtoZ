import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import searchBtn from '../img/searchBtn.png';
import styles from '../css/search.module.css';
import stylesM from '../css/searchM.module.css';
import loading from '../img/loading.png'

const Search = (props) => {

    const isTabletOrMobile = props.isTabletOrMobile;

    const pressEnter = props.pressEnter;
    const getNewItems = props.getNewItems;
    const query = props.query;
    const onQuery = props.onQuery;
    const isloading = props.isloading;

    return (
        <div>
            {
                isTabletOrMobile ?
                    <div className={stylesM.body}>
                        <div className={stylesM.wrap}>
                            <Link to='/' onClick={() => (window.scrollTo({ top: 0 }))}>
                                {
                                    isloading ? <img className={stylesM.loading} src={loading} alt='logo' /> :
                                    <img className={stylesM.logo} src={logo} alt='logo' />
                                }
                            </Link>
                            <div className={stylesM.inputDiv}>
                                <input className={stylesM.input} onKeyDown={pressEnter} value={query} onChange={onQuery} placeholder='검색어를 입력해보세요.' />
                            </div>
                            <button className={stylesM.btn} onClick={getNewItems}>
                                <img src={searchBtn} alt='검색' />
                            </button>
                        </div>
                    </div>
                    :
                    <div className={styles.body}>
                        <div className={styles.wrap}>
                            <Link to='/' onClick={() => (window.scrollTo({ top: 0 }))}>
                                {
                                    isloading ? <img className={styles.loading} src={loading} alt='logo' /> :
                                    <img className={styles.logo} src={logo} alt='logo' />
                                }
                            </Link>
                            <div className={styles.inputDiv}>
                                <input className={styles.input} onKeyDown={pressEnter} value={query} onChange={onQuery} placeholder='검색어를 입력해보세요.' />
                            </div>
                            <button className={styles.btn} onClick={getNewItems}>
                                <img src={searchBtn} alt='검색' />
                            </button>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Search;