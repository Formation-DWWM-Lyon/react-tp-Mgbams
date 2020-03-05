import React from 'react';
//import { Container } from 'react-bootstrap';
import Users from './components/Users';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ProfilePage } from "./pages";

const App = () => (
    <div>
      <Users />
      <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/:id(\d+)"
          component={ProfilePage}
        />
      </Switch>
    </BrowserRouter>
    </div>
);

export default App;


