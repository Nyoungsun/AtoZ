import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import BeatLoader from "react-spinners/BeatLoader";
import Swal from "sweetalert2";
import axios from 'axios';
import ItemsPc from './Itmes/ItemsPc';
import ItemsMobile from './Itmes/ItemsMobile';
import ItemsTablet from './Itmes/ItemsTablet';
import SearchMobile from './Search/SearchMobile';
import SearchTablet from './Search/SearchTablet';
import SearchPc from './Search/SearchPc';
import TopBtn from './TopBtn';

const Result = (props) => {

    const isPc = props.isPc;
    const isMobile = props.isMobile;
    const isTablet = props.isTablet;

    const location = useLocation();

    const navigate = useNavigate();

    const [ref, inView] = useInView();

    const [total, setTotal] = useState(location.state.total);
    const [query, setQuery] = useState(location.state.query);
    const [items, setItems] = useState(location.state.items);
    const [start, setStart] = useState(11);

    const [isloading, setIsLoading] = useState(false);

    const [showButton, setShowButton] = useState(false);

    const onQuery = (e) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        const onShowButton = () => {
            if (window.scrollY > 500) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }
        window.addEventListener("scroll", onShowButton)
        return () => {
            window.removeEventListener("scroll", onShowButton)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
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
                    scrollToTop();
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
        <div style={{ background: `#FAFBFC`, minHeight: `calc(100vh - 4rem)` }}>
            {isPc &&
                <SearchPc getNewItems={getNewItems}
                    pressEnter={pressEnter}
                    query={query}
                    onQuery={onQuery}
                    isloading={isloading} />
            }
            {isMobile &&
                <SearchMobile getNewItems={getNewItems}
                    pressEnter={pressEnter}
                    query={query}
                    onQuery={onQuery}
                    isloading={isloading} />
            }
            {isTablet &&
                <SearchTablet getNewItems={getNewItems}
                    pressEnter={pressEnter}
                    query={query}
                    onQuery={onQuery}
                    isloading={isloading} />
            }

            {isPc && items.map((items, index) => (<ItemsPc items={items} key={index} />))}
            {isMobile && items.map((items, index) => (<ItemsMobile items={items} key={index} />))}
            {isTablet && items.map((items, index) => (<ItemsTablet items={items} key={index} />))}

            {
                showButton && <TopBtn
                    isMobile={isMobile}
                    isPc={isPc}
                    scrollToTop={scrollToTop} />
            }
            {
                start < 1001 && start < total ?
                    <div ref={ref} style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 25 }}>
                        <BeatLoader color='#1564A8' margin={2}></BeatLoader>
                    </div>
                    :
                    <div></div>
            }
        </div>
    );
};

export default Result;
