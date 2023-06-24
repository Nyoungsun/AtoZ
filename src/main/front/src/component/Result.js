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

    const getMoreItems = () => {
        axios.get(`/search?query=${query}&start=${start}`)
            .then((result) => {
                setItems((prev) => [...prev, ...result.data.items]);
                setTotal(result.data.total);
            })
    }

    const [ref, inView] = useInView();

    useEffect(() => {
        if ((start < 1001) && (start < total) && inView) {
            setStart((prev) => prev + 10)
            getMoreItems();
        }
    }, [inView]);

    // const getNewItems = () => {
    //     axios.get(`/search?query=${query}&start=1`)
    //         .then((result) => {
    //             setStart(1);
    //             setItems(result.data.items);
    //             setTotal(result.data.total);
    //             window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    //             navigate('/result', { state: { query: query, items: result.data.items, total: result.data.total } });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    // const onClick = (e) => {
    //     e.preventDefault();
    //     getNewItems();
    // }

    const getNewItems = (e) => {
        axios.get(`/search?query=${query}&start=1`)
            .then((result) => {
                setStart(11);
                setItems(result.data.items);
                setTotal(result.data.total);
                navigate('/result', { state: { query: query, items: result.data.items, total: result.data.total } });
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            getNewItems();
        }
    };

    return (
        <div id='body'>
            <div id='wrap'>
                <div id='content'>
                    <Link to='/'><img id='logo' src={logo} alt='logo' /></Link>
                    <div id='ResultSearchDiv'>
                        <input id='ResultInput' onKeyDown={pressEnter} value={query} onChange={e => setQuery(e.target.value)} placeholder='검색어를 입력해보세요.' />
                    </div>
                    <button id='ResultSearchBtn' onClick={getNewItems}>
                        <img src={searchBtn} alt='검색' />
                    </button>
                </div>
            </div>
            {
                items.map((items, index) => (
                    <Items items={items} key={index} />
                ))
            }
            <div id='ref' ref={ref}></div>
        </div>
    );
};

export default Result;
