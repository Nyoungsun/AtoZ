import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './component/Result';
import Main from './component/Main';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;