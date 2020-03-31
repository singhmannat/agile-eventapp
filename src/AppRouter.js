import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddActivityPage from "./components/AddActivityPage.js";
import HomePage from "./components/HomePage.js";
import ActivityDashboardPage from "./components/ActivityDashboardPage.js";

const AppRouter = () => (
  <BrowserRouter>
    <h1>The Activity Application</h1>
    <Switch>
      <Route path="/" component={HomePage} exact={true} />
      <Route path="/add" component={AddActivityPage} />
      <Route path="/dashboard" component={ActivityDashboardPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
