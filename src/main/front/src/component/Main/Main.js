import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import MainPc from './MainPc';
import MainMobile from './MainMobile';
import MainTablet from './MainTablet';

const Main = (props) => {
    const navigate = useNavigate();

    const isPc = props.isPc;
    const isMobile = props.isMobile;
    const isTablet = props.isTablet;

    const inputFocus = useRef();

    const [query, setQuery] = useState('');

    const [isLoading, setIsLoading] = useState(null);

    const onQuery = (e) => {
        setQuery(e.target.value);
    }

    const getItems = async () => {
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
            const result = await axios.get(`/search?query=${query}&start=1`);
            const items = result.data.items;
            const total = result.data.total;
            setIsLoading(false);
            navigate('/result', {
                state: {
                    query: query,
                    items: items,
                    total: total
                }
            });
        }
    }

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            getItems();
        }
    };

    return (
        <div>
            {isPc && <MainPc pressEnter={pressEnter} getItems={getItems} onQuery={onQuery} isLoading={isLoading} inputFocus={inputFocus} />}
            {isTablet && <MainTablet pressEnter={pressEnter} getItems={getItems} onQuery={onQuery} isLoading={isLoading} inputFocus={inputFocus} />}
            {isMobile && <MainMobile pressEnter={pressEnter} getItems={getItems} onQuery={onQuery} isLoading={isLoading} inputFocus={inputFocus} />}
        </div>
    );
};

export default Main;