import React, { useEffect, useState } from 'react';
import '../css/Result.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Result = () => {

    const text = useLocation().state.text;

    const [data, setData] = useState([]);

    const params = {'text': text};

    useEffect(() => {
        axios.post('/search', null, { params: params })
            .then((res) => setData(res.data))
    }, [])


    return (
        <div>
            {
                data.items && data.items.map((data) => (
                    <p dangerouslySetInnerHTML={{ __html: data.title }} />
                ))
            }
        </div>
    );
};

export default Result;