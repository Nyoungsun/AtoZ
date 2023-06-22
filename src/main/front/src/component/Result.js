import React, { useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import logo from '../img/logo.png';
import searchBtn from '../img/searchBtn.png';
import '../css/Result.css';
import axios from 'axios';
import Items from './Items';

const Result = () => {
  const location = useLocation();
  const total = useState(location.state.total);
  const [text, setText] = useState(location.state.text);
  const [items, setItems] = useState(location.state.items);
  const [start, setStart] = useState(11); //result 페이지로 넘어와 스크롤 내리면 

  const params = {
    text: text,
    start: start
  };

  const getItems = () => {
    axios.post('search', null, { params: params })
    .then((res) => {
        setItems([...items, ...(res.data.items)])
        setStart((start) => start + 10);
    })
    .catch((err) => {console.log(err)})
  };

  const pressEnter = e => {
    if (e.key === 'Enter') {
      getItems();
    }
  };

  const [ref, inView] = useInView();

  useEffect(() => {
    if (start < 1001 & inView) {
      getItems();
    } 
  }, [inView]);

  return (
    <div id='body'>
      <div id='wrap'>
        <div id='wrapContent'>
          <Link to='/'>
            <img id='logo' src={logo} alt='logo' />
          </Link>
          <div id='ResultSearchDiv'>
            <input
              id='ResultInput'
              value={text}
              onKeyDown={pressEnter}
              onChange={e => setText(e.target.value)}
              placeholder='검색어를 입력해보세요.'
            />
          </div>
          <button id='ResultSearchBtn' onClick={getItems}>
            <img src={searchBtn} alt='검색' />
          </button>
        </div>
      </div>

      <div id='ContentWrap'>
        {items.map((items, index) => (
          <Items items={items} key={index} />
        ))}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default Result;
