import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Dashboard from './components/Dashboard/Dashboard';
import store from "./redux/store"; // Import Redux store

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;