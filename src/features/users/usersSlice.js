import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
    },
    userUpdated(state, action) {
      console.log("Payload for userUpdated:", action.payload);
      const { id, Name, Email, hobbies, City, gender } = action.payload;
      console.log("ID for userUpdated:", id);
      const existingUser = state.entities.find((user) => user.id === id);
      console.log("Existing user for userUpdated:", existingUser);
      if (existingUser) {
        existingUser.Name = Name;
        existingUser.Email = Email;
        existingUser.hobbies = hobbies;
        existingUser.City = City;
        existingUser.gender = gender;
      }
    },                                    
    userDeleted(state, action) {
      console.log("Payload for userDeleted:", action.payload);
      const { id } = action.payload;
      console.log("ID for userDeleted:", id);
      state.entities = state.entities.filter((user) => user.id !== id);
    },
  },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;
export default usersSlice.reducer;
