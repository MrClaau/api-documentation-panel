import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageContext from './components/Context/PageContext';
import APIMethodPage from './components/MethodPage/APIMethodPage';
import Home from './components/Home';

function App() {

  const configObject = {}

  const [config, setConfig] = useState<any>(configObject);
  const [title, setTitle] = useState(`Home`);

  return (
    <div className="App">
      <PageContext.Provider value={{ config, setConfig, title, setTitle }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<NavBar />}>
              <Route path='/' element={<Home />} />
              <Route path='/page/:id' element={<APIMethodPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PageContext.Provider>
    </div>
  );
}

export default App;
