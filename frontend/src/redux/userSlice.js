import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
  },
  reducers: {
    fetchUsers: (state, action) => {
      state.data = action.payload;
    },

    createUser: (state, action) => {
      state.data.push(action.payload);
    },

    updateUser: (state, action) => {
      const { id, name, email } = action.payload;

      const foundUser = state.data.find((us) => us.id == id);
      console.log(foundUser);
      if (foundUser) {
        foundUser.name = name;
        foundUser.email = email;
      }
    },

    deleteUser: (state, action) => {
      const id = action.payload;
      const user = state.data;
      const userFound = user.filter((us) => us.id !== id);
      console.log(userFound);
      state.data = userFound;
    },
  },
});

export const { fetchUsers, createUser, updateUser, deleteUser } =
  userSlice.actions;
export default userSlice.reducer;
