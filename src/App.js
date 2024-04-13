

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserList } from "./features/users/UserList";
import { AddUser } from "./features/users/AddUser";
import { EditUser } from "./features/users/EditUser";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/add-user" exact component={AddUser} />
        <Route path="/edit-user/:id" component={EditUser} />
      </Switch>
    </Router>
  );
}

export default App;


