import React from 'react';
import style from '../css/footer.module.css'
import styleM from '../css/footerM.module.css'
import BI from '../img/BI.png'

const Footer = (props) => {
    const isTabletOrMobile = props.isTabletOrMobile;
    
    return (
        <div>
            {
                isTabletOrMobile ?
                    <div className={styleM.body}>
                        <img src={BI} alt='BI'></img>
                    </div>
                    :
                    <div className={style.body}>
                        <img src={BI} alt='BI'></img>
                    </div>
            }
        </div>
    );
};

export default Footer;