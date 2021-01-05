import React from 'react';
import { HashRouter as Router, Switch , Route, Link ,Redirect} from "react-router-dom";
import RouterAuth from './routerComponent';
import {asyncComponent as async} from '@/utils/asyncComponent.js';

import Login from './login';
import NotFound from './notFound';

const routes = [

  ...Login,
  ...NotFound,
];

const BasicRoute = () => (
    <Router>
      <Switch>
        <RouterAuth config={routes}></RouterAuth>
      </Switch>
    </Router>
);

export default BasicRoute;