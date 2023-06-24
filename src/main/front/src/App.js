import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './component/Result';
import Main from './component/Main';

const App = () => {
  useEffect(() => { 
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Main />} />
        <Route path='/result' exact element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;