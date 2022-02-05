/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TutorialGrid from './grids/TutorialGrid';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="tutorial-grid" element={<TutorialGrid />} />
          {/* <Route path="high-frequency-grid" element={<Invoices />} /> */}
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>404 nothing here</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
