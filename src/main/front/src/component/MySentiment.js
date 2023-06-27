
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/mysentiment.module.css'
import stylesM from '../css/mysentimentM.module.css'
import clovaLogo from '../img/clovaLogo.png'
import logo from '../img/logo.png'
import analyzeBtn from '../img/analyzeBtn.png'
import Swal from "sweetalert2";
import axios from 'axios';

const MySentiment = (props) => {

    const navigate = useNavigate();

    const isTabletOrMobile = props.isTabletOrMobile;

    const [inputCount, setInputCount] = useState(0);

    const [text, setText] = useState('');

    const onInput = (e) => {
        setInputCount(e.target.value.length);
        setText(e.target.value);
    }

    const getSentiment = () => {
        if (text === '') {
            Swal.fire({
                icon: 'warning',
                text: '분석할 문장을 입력해주세요.',
                showCancelButton: false,
                confirmButtonText: "확인",
                confirmButtonColor: '#1564A8',
            })
        } else {
            axios.get(`/mySentiment?text=${text}`)
            .then((res) => {
                navigate('/MySentimentResult', { state: { result: res.data } });
            })
            .catch((error) => console.log(error))
        }
    }

    return (
        <div style={{ 'textAlign': 'center', background: `#FAFBFC` }}>
            {
                isTabletOrMobile ?
                <div className={stylesM.body}>
                <Link to='/'>
                    <div className={stylesM.logo}>
                        <img src={logo} alt='logo' />
                    </div>
                </Link>
                <div>
                    <p style={{ color: '#9e9e9e' }}> 한글문장만 분석 가능합니다.</p>
                    <p style={{ color: '#9e9e9e' }}>({inputCount}/1000자)</p>
                    <textarea className={stylesM.textArea} onChange={onInput} maxLength='1000'></textarea>
                </div>
                <div className={stylesM.btnWrap}>
                    <button onClick={getSentiment} className={stylesM.analyzeBtn}><img src={analyzeBtn} alt='analyzeBtn' /></button>
                </div>
                <img src={clovaLogo} className={stylesM.clovaLogo} alt='logo' />
            </div>
                    :
                    <div className={stylesM.body}>
                        <Link to='/'>
                            <div className={stylesM.logo}>
                                <img src={logo} alt='logo' />
                            </div>
                        </Link>
                        <div>
                            <p style={{ color: '#9e9e9e', lineHeight:1.5 }}> 한글로 작성된 글 속에 표현된 감정을 분석해보세요. <br/>
                            감정을 긍정, 부정, 중립으로 분석하고 감정을 판단하는데 핵심이 된 주요 표현 부분을 추출하여 알려드릴게요. <br/>
                            최대 1000자까지 입력가능해요. <br/><br/>
                            ({inputCount}자/1000자)</p>
                            <textarea className={styles.textArea} onChange={onInput} maxLength='1000'></textarea>
                        </div>
                        <div className={styles.btnWrap}>
                            <button onClick={getSentiment} className={styles.analyzeBtn}><img src={analyzeBtn} alt='analyzeBtn' /></button>
                        </div>
                        <img src={clovaLogo} className={styles.clovaLogo} alt='logo' />
                    </div>
            }
        </div>
    );
};

export default MySentiment;