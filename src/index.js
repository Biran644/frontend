import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ImportCSV from './ImportCSV';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <FluentProvider theme={teamsLightTheme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />}/>
            <Route path="/importcsv" element={<ImportCSV/>} />
          </Routes>
        </BrowserRouter>
      </FluentProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
