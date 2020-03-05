import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import store from "./store/store";
import Login from "./components/Login/Login";
import WorkList from "./components/workorder/WorkList/WorkList";
import PrivateRoute from "./util/PrivateRoute";
import WorkDetails from "./components/workorder/WorkDetails/WorkDetails";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/worklist" component={WorkList} />
            <PrivateRoute
              exact
              path="/wodetail/:woId"
              component={WorkDetails}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
