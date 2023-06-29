import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../css/MySentimentResult/MySentimentResultP.module.css'

const MySentiment = (props) => {

    const negative = props.negative;
    const neutral = props.neutral;
    const positive = props.positive;
    const sentiment = props.sentiment;
    const sentences = props.sentences;

    return (
        <div style={{ 'textAlign': 'center', background: `#FAFBFC` }}>
            <div className={style.body}>
                <Link to='/'>
                    <div className={style.logo}>
                        <img src='img/logo.png' alt='logo' />
                    </div>
                </Link>
                <h2 style={{ color: '#9e9e9e' }}> - 전체 글에 대한 감정 분석 결과 -</h2>
                <div className={style.resultArea}>
                    <p style={{ lineHeight: 2 }}>분석하신 글은 "{
                        sentences.map((sentences, index) => (
                            <span key={index}>{sentences.content}</span>
                        ))}" 이고,
                        <br />
                        [부정: {Math.round(negative * 100) / 100}%]
                        [중립: {Math.round(neutral * 100) / 100}%]
                        [긍정: {Math.round(positive * 100) / 100}%]의 분석 결과로 해당 글은<b> {
                            sentiment === 'negative' ? '부정적' : sentiment === 'neutral' ? '중립적' : '긍정적'}</b>
                        인 글이에요.
                    </p>
                </div>
                <h2 style={{ color: '#9e9e9e' }}> - 각 문장에 대한 감정 분석 결과 -</h2>
                <div className={style.resultArea}>
                    {
                        sentences.map((sentences, index) => (
                            <p key={index}><span><b>{sentences.content}</b></span><br />
                                [부정: {Math.round(sentences.confidence.negative * 10000) / 100}%]
                                [중립: {Math.round(sentences.confidence.neutral * 10000) / 100}%]
                                [긍정: {Math.round(sentences.confidence.positive * 10000) / 100}%]
                            </p>
                        ))
                    }
                </div>
                <div className={style.btnWrap}>
                    <Link to='/GetMySentiment'><img src='/img/retry.png' alt='retry' /></Link>
                </div>
            </div>
        </div>
    );
};

export default MySentiment;