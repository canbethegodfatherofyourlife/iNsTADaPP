import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MoralisProvider } from 'react-moralis';

const MORALIS_APP_ID='KDSgYwsHP5JJJthv1ngktuM13G4UAKJhva64upwW'
const MORALIS_SERVER_URL='https://gdhl0ynoopzx.usemoralis.com:2053/server'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
      <App />
    </MoralisProvider>
  </React.StrictMode>
);

