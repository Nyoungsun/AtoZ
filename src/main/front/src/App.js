import React from 'react';
import Search from './component/Search';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './component/Result';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;