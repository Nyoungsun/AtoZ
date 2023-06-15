import React, { useEffect, useState } from 'react';
import '../css/Result.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.png';

const Result = () => {

    const text = useLocation().state.text;

    const [data, setData] = useState([]);

    const params = { 'text': text };

    useEffect(() => {
        axios.post('/search', null, { params: params })
            .then((res) => setData(res.data))
    }, [])


    return (
        <div>
            <table id='wrap' border='1'>
                <tr>
                    <td>
                        <div><img src={logo} alt='logo' /></div>
                    </td>
                    <td>
                        <input id='ResultInput'></input>
                    </td>
                </tr>
                <div id='ResultLogoDiv'>

                </div>
                <div>
                </div>
            </table>
            {
                data.items && data.items.map((data) => (
                    <div dangerouslySetInnerHTML={{ __html: data.title }} />
                ))
            }
        </div>
    );
};

export default Result;