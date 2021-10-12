import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import jwtDecode from "jwt-decode";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/layout/Navbar";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// Components

import AuthRoute from "./util/AuthRoute";
// Pages
import login from "./pages/login";

import signup from "./pages/signup";
import courses from "./pages/courses";
import feedbacks from "./pages/feedbacks";
import Search from "./components/Search";
import axios from "axios";

axios.defaults.baseURL =
  "https://us-central1-courselect-c8738.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Search} />
              <AuthRoute path="/login" exact component={login} />
              <AuthRoute path="/signup" exact component={signup} />
              <Route path="/courses" exact component={courses} />
              <Route path="/feedbacks" exact component={feedbacks} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
