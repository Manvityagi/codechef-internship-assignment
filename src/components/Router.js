import React from "react";
import App from "./App";
import ComboBox from "./ComboBox/ComboBox";
import NotFound from "./ErrorHandling/NotFound";
import Problem from "./Problem/Problem";
import Contest from "./Contest/Contest";
import Ranking from "./Ranking/Ranking"
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/search" component={ComboBox} />
      <Route exact path="/contest/:contest_code" component={Contest} />
      <Route exact path="/contests/:contest_code/problems/:problem_code" component={Problem} />
      <Route exact path="/rankings/:contest_code" component={Ranking}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
