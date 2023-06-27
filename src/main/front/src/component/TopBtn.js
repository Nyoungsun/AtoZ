import React from 'react';
import style from '../css/topBtn.module.css';

const TopBtn = (props) => {

    const scrollToTop = props.scrollToTop;
    const isTabletOrMobile = props.isTabletOrMobile;

    return (
        <div>
            <div className={isTabletOrMobile ? `${style.wrapM}` : `${style.wrap}`}>
                <button className={style.topBtn} onClick={scrollToTop} type="button">
                    <img src='img/topBtn.png' className={isTabletOrMobile ? `${style.btnImgM}` : `${style.btnImg}`} alt='btnImg'/>
                </button>
            </div>
        </div>
    );
};

export default TopBtn;