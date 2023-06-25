import React from 'react';
import style from '../css/footer.module.css'
import BI from '../img/BI.png'

const Footer = () => {
    return (
        <div className={style.body}>
            <img src={BI} alt='BI'></img>
        </div>
    );
};

export default Footer;