import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { MenuProvider } from './state/menuContext';
import { Provider } from 'react-redux';
import store from './state/store';
import store2 from './state/store2';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuProvider>
        <Provider store={store}>
          <Provider store={store2}>
            <App />
          </Provider>
        </Provider>
      </MenuProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();