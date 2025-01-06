import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './Context/Appcontext';
import { AdminProvider } from './Context/Admincontext';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </AppProvider>
  </Provider>
);
