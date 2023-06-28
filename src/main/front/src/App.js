import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import Result from './component/Result';
import Main from './component//Main/Main';
import GetMySentiment from './component/GetMySentiment/GetMySentiment';
import MySentimentResult from './component/MySentimentResult/MySentimentResult';
import Footer from './component/Footer';
import './css/App.module.css'

const App = () => {
  const isPc = useMediaQuery({
    query: "(min-width:1024px)"
  });
  const isTablet = useMediaQuery({
    query: "(min-width:767px) and (max-width:1024px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width:767px)"
  });

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Main isPc={isPc} isTablet={isTablet} isMobile={isMobile} />} />
        <Route path='/result' exact element={<Result isPc={isPc} isTablet={isTablet} isMobile={isMobile} />} />
        <Route path='/GetMySentiment' exact element={<GetMySentiment isPc={isPc} isTablet={isTablet} isMobile={isMobile} />} />
        <Route path='/MySentimentResult' exact element={<MySentimentResult isPc={isPc} isTablet={isTablet} isMobile={isMobile} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;