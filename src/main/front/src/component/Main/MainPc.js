import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../css/Main/MainP.module.css'

const MainPc = (props) => {

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
                            <img src='/img/logo.png' alt='logo' /> //public 폴더 안에 이미지 절대 경로로 가져올 때 사용법
                    }
                </div>
                <div className={style.inputDiv}>
                    <input className={style.input}
                        onChange={onQuery}
                        ref={inputFocus}
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

export default MainPc;