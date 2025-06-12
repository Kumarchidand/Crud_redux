import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users", // name of the slice
  initialState: {
    users: [], // this is your initial state
  },
  reducers: {
    // This function updates state with data from action.payload
    getUsers: (state, action) => {
      state.users = action.payload.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
      }));
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((x) => x.id == action.payload.id);
      state.users[index] = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        age: action.payload.age,
      };
    },
    deleteUser: (state, action) => {
      const id = action.payload.id;
      state.users = state.users.filter((u) => u.id != id);
    },
  },
});

export const { getUsers, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
