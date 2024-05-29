import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { App, Role, User } from "../common";

interface propsState {
  users: User[];
  roles: Role[];
  apps: App[];
}

const initialState: propsState = {
  users: [],
  roles: [],
  apps: [],
};

const propsSlice = createSlice({
  name: "props",
  initialState,
  reducers: {
    gotUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    gotRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },
    gotApps: (state, action: PayloadAction<App[]>) => {
      state.apps = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    props: propsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { actions } = propsSlice;
