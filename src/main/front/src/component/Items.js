import React from 'react';
import style from '../css/items.module.css'
import styleM from '../css/itemsM.module.css'

const items = (props) => {

    const isTabletOrMobile = props.isTabletOrMobile;
    const items = props.items;

    return (
        <div>
            {
                isTabletOrMobile ?
                    <div className={styleM.items}>
                        <p className={styleM.postdate}>{items.postdate}</p>
                        {
                            items.sentiment === 'negative' ?
                                <span className={styleM.sentiment}>부정적인 내용의 글입니다.</span> :
                                items.sentiment === 'positive' ?
                                    <span className={styleM.sentiment}>긍정적인 내용의 글입니다.</span> :
                                    <span className={styleM.sentiment}>중립적인 내용의 글입니다.</span>
                        }
                        <div onClick={() => { window.open(`${items.link}`) }} className={styleM.title} dangerouslySetInnerHTML={{ __html: items.title }} />
                        <br />
                        <hr />
                        <br />
                        <div className={styleM.description} dangerouslySetInnerHTML={{ __html: items.description }} />
                    </div>
                    :
                    <div className={style.items}>
                        <p className={style.postdate}>{items.postdate}</p>
                        {
                            items.sentiment === 'negative' ?
                                <span className={style.sentiment}>부정적인 내용의 글입니다.</span> :
                                items.sentiment === 'positive' ?
                                    <span className={style.sentiment}>긍정적인 내용의 글입니다.</span> :
                                    <span className={style.sentiment}>중립적인 내용의 글입니다.</span>
                        }
                        <div onClick={() => { window.open(`${items.link}`) }} className={style.title} dangerouslySetInnerHTML={{ __html: items.title }} />
                        <br />
                        <hr />
                        <br />
                        <div className={style.description} dangerouslySetInnerHTML={{ __html: items.description }} />
                    </div>
            }
        </div>
    );
};

export default items;