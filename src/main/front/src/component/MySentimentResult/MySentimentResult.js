import React from 'react';
import { useLocation } from 'react-router-dom';
import MySentimentResultPc from './MySentimentResultPc';
import MySentimentResultMobile from './MySentimentResultMobile';
import MySentimentResultTablet from './MySentimentResultTablet';

const MySentiment = (props) => {

    const isPc = props.isPc;
    const isMobile = props.isMobile;
    const isTablet = props.isTablet;

    const location = useLocation();

    const result = location.state.result;

    const confidence = result.document.confidence;
    const negative = confidence.negative;
    const neutral = confidence.neutral;
    const positive = confidence.positive;

    const sentiment = result.document.sentiment;

    //배열형이고 각 배열안에 confidence, sentiment, content가 있음
    const sentences = result.sentences;

    return (
        <div>
            {isPc && <MySentimentResultPc
                sentences={sentences}
                sentiment={sentiment}
                negative={negative}
                neutral={neutral}
                positive={positive} />}

            {isMobile && <MySentimentResultMobile
                sentences={sentences}
                sentiment={sentiment}
                negative={negative}
                neutral={neutral}
                positive={positive} />}

            {isTablet && <MySentimentResultTablet
                sentences={sentences}
                sentiment={sentiment}
                negative={negative}
                neutral={neutral}
                positive={positive} />}
        </div>
    );
};

export default MySentiment;