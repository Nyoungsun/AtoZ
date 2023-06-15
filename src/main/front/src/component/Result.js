import React, { useEffect } from 'react';
import '../css/Result.css'
import { Await, useLocation } from 'react-router-dom';
import axios from 'axios';

const Result = () => {

    const text = useLocation().state.text;

    const params = { text: text };

    useEffect(() => {
        axios.post('/search', null, { params: params })
            .then((res) => console.log(res))
    },[])

    return (
        <div>
            <p>{text}</p>
        </div>
    );
};

export default Result;