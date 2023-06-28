import React from 'react';
import style from '../css/TopBtn.module.css';

const TopBtn = (props) => {

    const scrollToTop = props.scrollToTop;
    const isPc = props.isPc;
    const isMobile = props.isMobile;

    return (
        <div>
            <div className={isMobile ? `${style.wrapM}` : isPc ? `${style.wrapP}` : `${style.wrapT}`}>
                <button className={style.topBtn} onClick={scrollToTop} type="button">
                    <img src='img/top.png' className={isMobile ? `${style.btnImgM}` : isPc ? `${style.btnImgP}` : `${style.btnImgT}`} alt='btnImg'/>
                </button>
            </div>
        </div>
    );
};

export default TopBtn;