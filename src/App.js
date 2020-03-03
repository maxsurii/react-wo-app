import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import store from "./store/store";
import Login from "./components/Login/Login";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/login" component={Login} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
