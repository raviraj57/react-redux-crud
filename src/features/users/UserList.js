import './userlist.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userDeleted} from "./usersSlice";

export function UserList() {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.users);

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  
  return (
    <div  className="user-list-body">
      <div>
        <Link to="/add-user">
          <button className='button-add'>Add user</button>
        </Link>
      </div>
      <div >
        <table>
          <thead >
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Hobbies</th>
             <th>City</th>
             <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='id'>
            {entities.map(({ id, Name, Email ,hobbies,City,gender}) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{Name}</td>
                <td>{Email}</td>
                <td>{hobbies.join(", ")}</td>
                <td>{City}</td>
                <td>{gender}</td>
                <td>
                  <button className='button-delete' onClick={() => handleDelete(id)}>Delete</button>&nbsp;
                  <Link to={`/edit-user/${id}`}>
                    <button className='button-edit'>Edit</button>
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