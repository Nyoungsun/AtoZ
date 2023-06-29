import React from 'react';
import style from '../../css/Items/ItemsT.module.css';

const ItmesTablet = (props) => {

    const items = props.items;

    return (
        <div>
            <div onClick={() => { window.open(`${items.link}`) }} className={style.items}>
                <p className={style.postdate}>{items.postdate}</p>
                <p className={style.title} dangerouslySetInnerHTML={{ __html: items.title }} />
                <hr />
                <p className={style.description} dangerouslySetInnerHTML={{ __html: items.description }} />
                <p className={style.sentiment}>
                    [부정: {Math.round(items.confidence.negative * 100) / 100}%]
                    [중립: {Math.round(items.confidence.neutral * 100) / 100}%]
                    [긍정: {Math.round(items.confidence.positive * 100) / 100}%]의 결과로 {
                        items.sentiment === 'negative' ? <b>부정적인 내용의 글입니다.</b> :
                            items.sentiment === 'positive' ?  <b>긍정적인 내용의 글입니다.</b> :
                            <b>중립적인 내용의 글입니다.</b>
                    }
                </p>
            </div>
        </div>
    );
};

export default ItmesTablet;