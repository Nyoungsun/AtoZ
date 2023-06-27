
import { color } from '@mui/system';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../css/mysentimentResult.module.css'
import stylesM from '../css/mysentimentResultM.module.css'
import clovaLogo from '../img/clovaLogo.png'
import logo from '../img/logo.png'

const MySentiment = (props) => {

    const location = useLocation();

    const isTabletOrMobile = props.isTabletOrMobile;

    const result = location.state.result;

    const confidence = result.document.confidence;
    const negative = confidence.negative;
    const neutral = confidence.neutral;
    const positive = confidence.positive;

    const sentiment = result.document.sentiment;

    const sentences = result.sentences; //배열형이고 각 배열안에 confidence, sentiment, content가 있음

    console.log(result);

    return (
        <div style={{ 'textAlign': 'center', background: `#FAFBFC`}}>
            {
                isTabletOrMobile ?
                    <div className={stylesM.body}>
                        <Link to='/'>
                            <div className={stylesM.logo}>
                                <img src={logo} alt='logo' />
                            </div>
                        </Link>
                        <div>
                            <p style={{ color: '#9e9e9e' }}> 분석결과</p>
                            <div className={stylesM.textArea}>
                                {
                                    sentences.map((sentences, index) => (
                                        <p key={index}>{sentences.content}</p>
                                    ))
                                }
                            </div>
                        </div>
                        <img src={clovaLogo} className={styles.clovaLogo} alt='logo' />
                    </div>
                    :
                    <div className={styles.body}>
                        <Link to='/'>
                            <div className={styles.logo}>
                                <img src={logo} alt='logo' />
                            </div>
                        </Link>
                        <div>
                            <p style={{ color: '#9e9e9e' }}> - 분석 결과 -</p>
                            <div className={styles.resultArea}>
                                <b>전체 문장에 대한 감정 분석 결과는 "{sentiment}"입니다.</b>
                                <p> negative:{negative}</p> 
                                <p> neutral:{neutral}</p> 
                                <p> positive:{positive}</p>
                                <b>문장별 감정 분석 결과입니다.</b>
                                {
                                    sentences.map((sentences, index) => (
                                        <p key={index}>{index +1}번 문장: {sentences.content}<br/>
                                        negative: {sentences.confidence.negative} <br/>
                                        neutral:{sentences.confidence.neutral} <br/>
                                        positive:{sentences.confidence.positive} <br/>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={styles.btnWrap}>
                        <Link to='/mySentiment'><button></button></Link>
                    </div>
                        <img src={clovaLogo} className={styles.clovaLogo} alt='logo' />
                    </div>
            }
        </div>
    );
};

export default MySentiment;