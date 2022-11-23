import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './contexts/store';
import { MessageContextProvider } from './modules/common/UserMessage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MessageContextProvider>


          <App />
        </MessageContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

