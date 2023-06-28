import React from 'react';
import style from '../css/TopBtn.module.css';

const TopBtn = (props) => {

    const scrollToTop = props.scrollToTop;
    const isPc = props.isPc;
    const isMobile = props.isMobile;
    const isTablet = props.isTablet;

    return (
        <div>
            <div className={isMobile ? `${style.wrapM}` : isPc ? `${style.wrapP}` : `${style.wrapT}`}>
                <button className={style.topBtn} onClick={scrollToTop} type="button">
                    <img src='img/top.png' className={isMobile ? `${style.btnImgM}` : `${style.btnImg}`} alt='btnImg'/>
                </button>
            </div>
        </div>
    );
};

export default TopBtn;