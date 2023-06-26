import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Items from './Items';
import Search from './Search';
import BeatLoader from "react-spinners/BeatLoader";
import Swal from "sweetalert2";

const Result = (props) => {

    const isTabletOrMobile = props.isTabletOrMobile;

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
            }).catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if ((start < 1001) && (start < total) && inView) {
            setStart((prev) => prev + 10)
            getMoreItems();
        }
    }, [inView]);

    const [isloading, setIsLoading] = useState(false);

    const getNewItems = async () => {
        if (query === '') {
            Swal.fire({
                icon: 'warning',
                text: '검색어를 입력해주세요.',
                showCancelButton: false,
                confirmButtonText: "확인",
                confirmButtonColor: '#1564A8',
            })
        } else {
            setIsLoading(true);
            await axios.get(`/search?query=${query}&start=1`)
                .then((result) => {
                    setStart(11);
                    setItems(result.data.items);
                    setTotal(result.data.total);
                    navigate('/result', { state: { query: query, items: result.data.items, total: result.data.total } });
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
                })
                .catch((error) => {
                    console.log(error);
                })
            setIsLoading(false);
        }
    }

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            getNewItems();
        }
    };

    return (
        <div style={{ background: `#FAFBFC`, minHeight: '100vh' }}>
            <Search getNewItems={getNewItems} pressEnter={pressEnter} query={query} onQuery={onQuery} isloading={isloading} isTabletOrMobile={isTabletOrMobile} />
            {items.map((items, index) => (
                <Items items={items} key={index} isTabletOrMobile={isTabletOrMobile} />
            ))}
            {start < 1001 && start < total ? (
                <div ref={ref} style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 25 }}>
                    <BeatLoader color='#1564A8' margin={2}></BeatLoader>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Result;
