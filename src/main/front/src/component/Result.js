import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Items from './Items';
import Search from './Search';

const Result = () => {
    const location = useLocation();

    const navigate = useNavigate();

    const [ref, inView] = useInView();

    const [total, setTotal] = useState(location.state.total);
    const [query, setQuery] = useState(location.state.query);
    const [items, setItems] = useState(location.state.items);
    const [start, setStart] = useState(11);

    const onQuery = (e) => {
        setQuery(e.target.value)
    }

    const getMoreItems = () => {
        axios.get(`/search?query=${query}&start=${start}`)
            .then((result) => {
                setItems((prev) => [...prev, ...result.data.items]);
                setTotal(result.data.total);
            })
    }

    useEffect(() => {
        if ((start < 1001) && (start < total) && inView) {
            setStart((prev) => prev + 10)
            getMoreItems();
        }
    }, [inView]);

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
        <div style={{background: '#FAFBFC'}}>
            <Search getNewItems={getNewItems} pressEnter={pressEnter} query={query} onQuery={onQuery} />
            {
                items.map((items, index) => (
                    <Items items={items} key={index} />
                ))
            }
            <div style={{border: '1px solid #FAFBFC'}} ref={ref}></div>
        </div>
    );
};

export default Result;
