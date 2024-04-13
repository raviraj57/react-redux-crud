<!-- ### Simple React Redux CRUD app for my tutorial on Dev.to

                  {/* <Link to={{ pathname: `/add-user/${id}` }}> */}
// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserList } from "./UserList";
import { AddUser } from "./AddUser";
import { EditUser } from "./EditUser";

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

// EditUser.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateUser } from "./usersSlice";

export function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { entities } = useSelector((state) => state.users);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = entities.find((user) => user.id === parseInt(id));
    setUserData(user);
  }, [entities, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userData));
    history.push("/");
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email || ""}
            onChange={handleInputChange}
          />
        </div>
        {/* Add other fields for editing */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

// UserList.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userDeleted } from "./usersSlice";

export function UserList() {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.users);

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  return (
    <div>
      <div>
        <Link to="/add-user">
          <button>Add user</button>
        </Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entities.map(({ id, name, email }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <button onClick={() => handleDelete(id)}>Delete</button>
                  <Link to={`/edit-user/${id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


//app
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserList } from "./components/users/UserList";
import { AddUser } from "./components/users/AddUser";
import { EditUser } from "./components/users/EditUser";

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