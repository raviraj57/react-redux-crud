import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { userUpdated } from "./usersSlice";

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
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedHobbies = checked
        ? [...(userData.hobbies || []), value]
        : userData.hobbies.filter((hobby) => hobby !== value);
      setUserData({ ...userData, [name]: updatedHobbies });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userUpdated(userData));
    history.push("/");
  };

  return (
    <div className="edit-page-body">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="Name"
            value={userData?.Name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="Email"
            value={userData?.Email || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>
            Hobbies:
            <input
              type="checkbox"
              value="Reading"
              name="hobbies"
              checked={userData?.hobbies && userData.hobbies.includes("Reading")}
              onChange={handleInputChange}
            />
            Reading
            <input
              type="checkbox"
              value="Gaming"
              name="hobbies"
              checked={userData?.hobbies && userData.hobbies.includes("Gaming")}
              onChange={handleInputChange}
            />
            Gaming
            <input
              type="checkbox"
              value="Traveling"
              name="hobbies"
              checked={userData?.hobbies && userData.hobbies.includes("Traveling")}
              onChange={handleInputChange}
            />
            Traveling
          </label>
        </div>
        <div>
          <label>
            City:
            <select name="City" value={userData?.City || ""} onChange={handleInputChange}>
              <option value="">Select City</option>
              <option value="surat">surat</option>
              <option value="jamnagar">jamnagar</option>
              <option value="vadodara">vadodara</option>
              <option value="ahmadabad">ahmadabad</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Gender:
            <input
              type="radio"
              value="Male"
              name="gender"
              checked={userData?.gender === "Male"}
              onChange={handleInputChange}
            />
            Male
            <input
              type="radio"
              value="Female"
              name="gender"
              checked={userData?.gender === "Female"}
              onChange={handleInputChange}
            />
            Female
          </label>
        </div>
        <button className='button-update' type="submit">Update</button>
      </form>
    </div>
  );
}
