import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { App, Role, RoleApp, User, UserRole } from "../common";

interface propsState {
  users: User[];
  roles: Role[];
  apps: App[];
  user_role: UserRole[];
  role_app: RoleApp[];
}

const initialState: propsState = {
  users: [],
  roles: [],
  apps: [],
  user_role: [],
  role_app: [],
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
    gotUserRole: (state, action: PayloadAction<UserRole[]>) => {
      state.user_role = action.payload;
    },
    gotRoleApp: (state, action: PayloadAction<RoleApp[]>) => {
      state.role_app = action.payload;
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
