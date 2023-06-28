import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../css/GetMySentiment/GetMySentimentT.module.css';

const GetMySentimentTablet = (props) => {

    const getSentiment = props.getSentiment;
    const onInput = props.onInput;
    const inputCount = props.inputCount;
    const textArea = props.textArea;

    return (
        <div style={{ 'textAlign': 'center', background: `#FAFBFC` }}>
            <div className={style.body}>
                <Link to='/'>
                    <div className={style.logo}>
                        <img src='img/logo.png' alt='logo' />
                    </div>
                </Link>
                <div>
                    <h3 style={{ lineHeight: 1.5 }}>
                        한글로 작성된 글 속 감정을 분석해보세요. <br />
                        감정을 긍정, 부정, 중립으로 분석하고 감정을 판단하는데 핵심이 된 주요 표현 부분을 추출하여 알려드릴게요. <br /><br /><br />
                    </h3>
                    <h4>({inputCount}자/1000자)</h4>
                    <div className={style.textAreaWrap}>
                        <textarea placeholder='최대 1000자까지 입력가능해요.' rows={1} className={style.textArea} onChange={onInput} ref={textArea} maxLength='1000'></textarea>
                    </div>
                </div>
                <div className={style.btnWrap}>
                    <button onClick={getSentiment} className={style.analyzeBtn}><img src='img/analyze.png' alt='analyze' /></button>
                </div>
            </div>
        </div>
    );
};

export default GetMySentimentTablet;