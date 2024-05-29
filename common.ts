export interface User {
  GUID: string;
  FullName: string;
  PicturePath: string;
  email: string;
}

export interface Role {
  GUID: string;
  Name: string;
}

export interface App {
  GUID: string;
  Name: string;
  IconPath: string;
  URL: string;
}

export interface UserRole {
  UserGUID: string;
  RoleGUID: string;
}

export interface RoleApp {
  RoleGUID: string;
  AppGUID: string;
}
