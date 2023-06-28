import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../css/Main/MainM.module.css'

const MainMobile = (props) => {
    
    const inputFocus = props.inputFocus;
    const isLoading = props.isLoading;
    const pressEnter = props.pressEnter;
    const getItems = props.getItems;
    const onQuery = props.onQuery;

    return (
        <div>
            <div className={style.body}>
                <div className={style.logoDiv}>
                    {
                        isLoading ?
                            <div className={style.loadingDiv}>
                                <img src='/img/loading' alt='loading' className={style.loading} />
                            </div> :
                            <img src='/img/logo.png' alt='logo' />
                    }
                </div>
                <div className={style.inputDiv}>
                    <input className={style.input}
                        ref={inputFocus}
                        onChange={onQuery}
                        onKeyDown={pressEnter}
                        placeholder="검색어를 입력해보세요." />
                    <button className={style.searchbtn} onClick={getItems}>
                        <img src='/img/search.png' alt='검색' />
                    </button>
                </div>
                <Link to='/GetMySentiment'><div className={style.goSentiment}>내 글 감정분석 해보기</div></Link>
            </div>
        </div>
    );
};

export default MainMobile;