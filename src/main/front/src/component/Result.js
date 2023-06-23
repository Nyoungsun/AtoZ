import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import logo from '../img/logo.png';
import searchBtn from '../img/searchBtn.png';
import '../css/Result.css';
import Items from './Items';

const Result = () => {
    const location = useLocation();

    const navigate = useNavigate();

    const [total, setTotal] = useState(location.state.total);
    const [query, setQuery] = useState(location.state.query);
    const [items, setItems] = useState(location.state.items);
    const [start, setStart] = useState(11);

    const getMoreItems = async () => {
        const result = await axios.get(`/search?query=${query}&start=${start}`);
        const items = result.data.items;
        const total = result.data.total;
        setItems((prev) => [...prev, ...items])
        setTotal(total);
    }

    const [ref, inView] = useInView();

    useEffect(() => {
        if ((start < 1001) & (start < total) & inView) {
            setStart((prev) => prev + 10)
            getMoreItems();
        }
    }, [inView]);

    const getNewItems = () => {
        axios.get(`/search?query=${query}&start=1`)
        .then((result) => {
            setItems(result.data.items)
            setTotal(result.data.total)
        })
        navigate('/result', {state: {query:query, items: items, total: total}});
    }

    const onClick = (e) => {
        e.preventDefault();
        getNewItems();
    }

    return (
        <div id='body'>
            <div id='wrap'>
                <div id='content'>
                    <Link to='/'><img id='logo' src={logo} alt='logo' /></Link>
                    <div id='ResultSearchDiv'>
                        <input id='ResultInput' value={query} onChange={e => setQuery(e.target.value)} placeholder='검색어를 입력해보세요.' />
                    </div>
                    <button id='ResultSearchBtn'>
                        <img src={searchBtn} onClick={onClick} alt='검색' />
                    </button>
                </div>
            </div>
            {items.map((items, index) => (
                <Items items={items} key={index} />
            ))}
            <div ref={ref}></div>
        </div>
    );
};

export default Result;
