import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { App, Role, RoleApp, User, UserRole } from "../common";

interface propsState {
  users: User[];
  users_selected: User[];
  roles: Role[];
  roles_selected: Role[];
  apps: App[];
  apps_selected: App[];
  user_role: UserRole[];
  role_app: RoleApp[];
  error: string;
}

const initialState: propsState = {
  users: [],
  users_selected: [],
  roles: [],
  roles_selected: [],
  apps: [],
  apps_selected: [],
  user_role: [],
  role_app: [],
  error: "",
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
    usersSelectedRm: (state, action: PayloadAction<User>) => {
      state.users_selected = state.users_selected.filter(
        (us) => us.GUID !== action.payload.GUID
      );
    },
    usersSelectedAdd: (state, action: PayloadAction<User>) => {
      state.users_selected.push(action.payload);
    },
    rolesSelectedRm: (state, action: PayloadAction<Role>) => {
      state.roles_selected = state.roles_selected.filter(
        (rs) => rs.GUID !== action.payload.GUID
      );
    },
    rolesSelectedAdd: (state, action: PayloadAction<Role>) => {
      state.roles_selected.push(action.payload);
    },
    appsSelectedRm: (state, action: PayloadAction<App>) => {
      state.apps_selected = state.apps_selected.filter(
        (as) => as.GUID !== action.payload.GUID
      );
    },
    appsSelectedAdd: (state, action: PayloadAction<App>) => {
      state.apps_selected.push(action.payload);
    },
    fetchFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
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
