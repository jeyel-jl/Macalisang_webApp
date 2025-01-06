import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './Context/Appcontext';
import { AdminProvider } from './Context/Admincontext';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Root reducer (combine your reducers here)
const rootReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* Provide Redux store */}
    <AppProvider> {/* Your custom context provider */}
      <AdminProvider> {/* Another custom context provider */}
        <App /> {/* Main App component */}
      </AdminProvider>
    </AppProvider>
  </Provider>
);
