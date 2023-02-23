import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app';

TagManager.initialize({
  gtmId: "GTM-WG8XPZB"
});

const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  rootElement
);
