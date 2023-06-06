import React from 'react';
import '../css/Result.css'
import { useLocation } from 'react-router-dom';

const Result = () => {

    const text = useLocation().state.text;

    return (
        <div>
            <p>{text}</p>
        </div>
    );
};

export default Result;