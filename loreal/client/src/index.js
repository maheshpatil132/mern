import React, { createContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider, StateProvider } from './components/store';
import { Reducer , initialValue } from './components/reducer';

 export const State = createContext()
ReactDOM.render(
  
  <React.StrictMode>
    <BrowserRouter>
   <StateProvider initialValue={ initialValue } reducer={Reducer}>
    <App />
    </StateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
