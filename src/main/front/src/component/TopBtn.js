import React from 'react';
import style from '../css/topBtn.module.css';
import btnImg from '../img/topBtn.png';

const TopBtn = (props) => {

    const scrollToTop = props.scrollToTop;
    const isTabletOrMobile = props.isTabletOrMobile;

    return (
        <div>
            <div className={isTabletOrMobile ? `${style.wrapM}` : `${style.wrap}`}>
                <button className={style.topBtn} onClick={scrollToTop} type="button">
                    <img src={btnImg} className={isTabletOrMobile ? `${style.btnImgM}` : `${style.btnImg}`} alt='btnImg'/>
                </button>
            </div>
        </div>
    );
};

export default TopBtn;