import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './component/Result';
import Main from './component/Main';
import MySentiment from './component/MySentiment';
import MySentimentResult from './component/MySentimentResult';
import './css/app.module.css'
import Footer from './component/Footer';
import { useMediaQuery } from 'react-responsive'

const App = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 820 });

  useEffect(() => { 
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Main isTabletOrMobile={isTabletOrMobile}/>} />
        <Route path='/result' exact element={<Result isTabletOrMobile={isTabletOrMobile}/>} />
        <Route path='/MySentiment' exact element={<MySentiment isTabletOrMobile={isTabletOrMobile}/>}/>
        <Route path='/MySentimentResult' exact element={<MySentimentResult isTabletOrMobile={isTabletOrMobile}/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;