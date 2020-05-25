import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import AddActivityPage from "./components/AddActivityPage.js";
import HomePage from "./components/HomePage.js";
import ActivityDashboardPage from "./components/ActivityDashboardPage.js";
import AddNewActivity from "./components/AddNewActivity.js";
import AddNewChildPage from "./components/AddNewChildPage.js";
import MyUpcomingActivities from "./components/MyUpcomingActivities.js";
import HelpPage from "./components/HelpPage.js";

const AppRouter = () => (
  <BrowserRouter>
    <h1>The Activity Application</h1>
    <Switch>
      <Route path="/" component={HomePage} exact={true} />
      <Route path="/add" component={AddNewActivity} />
      <Route path="/dashboard" component={ActivityDashboardPage} />
      <Route path="/addnewchild" component={AddNewChildPage} />
      <Route path="/mua" component={MyUpcomingActivities} />
      <Route path="/helppage" component={HelpPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
