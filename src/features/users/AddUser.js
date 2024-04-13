import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userAdded } from "./usersSlice";
import './userlist.css'
export function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [City, setCity] = useState("");
  const [gender, setGender] = useState("");
 

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  //

  //
  const handleHobbies = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setHobbies([...hobbies, value]);
    } else {
      setHobbies(hobbies.filter((hobby) => hobby !== value));
    }
  };
  const handlecity = (e) => setCity(e.target.value);
  const handleGender = (e) => setGender(e.target.value);


  const IndexNumber = useSelector((state) => state.users.entities.length);

  const handleClick = () => {
    if (
      Name &&
      Email &&
      hobbies.length > 0 &&
      City &&
      gender 
   
    ) {
      dispatch(
        userAdded({
          id: IndexNumber + 1,
          Name,
         Email,
          hobbies,
          City,
          gender
          
        })
      );
      history.push("/");
    } else {
      alert("Please fill in all the fields correctly.");
    }
  };

  return (
    <div className="adduser">
      <div>
        <h3>Add user</h3>
      </div>
      <div>
        <div>
          <form onSubmit={handleClick}>
            <label>
             Name
              <input
                type="text"
                id="Name"
                onChange={handleName}
                value={Name}
              />
            </label>
            <label>
            Email:
              <input
                type="email"
                id="Email"
                onChange={handleEmail}
                value={Email}
              />
            </label>
            <div>
              <label>
                Hobbies:
                <input
                  type="checkbox"
                  value="Reading"
                  onChange={handleHobbies}
                />
                Reading
                <input
                  type="checkbox"
                  value="Gaming"
                  onChange={handleHobbies}
                />
                Gaming
                <input
                  type="checkbox"
                  value="Traveling"
                  onChange={handleHobbies}
                />
                Traveling
              </label>
            </div>
            <div>
              <label>
                City:
                <select value={City} onChange={handlecity}>
                 
                  <option value="">Select City</option>
                  <option value="surat"> surat</option>
                  <option value="jamnagar">jamnagar</option>
                  <option value="vadodara"> vadodara</option>
                  <option value="ahmadabad"> ahmadabad</option>
            
                </select>
              </label>
            </div>
            <div>
              <label>
                Gender:
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={handleGender}
                />
                Male
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={handleGender}
                />
                Female
              </label>
            </div>
           
          </form>
          <button className="button-submit" onClick={handleClick}>Submit </button>
        </div>
      </div>
    </div>
  );
}

