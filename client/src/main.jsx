import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>

  </Provider>
)
