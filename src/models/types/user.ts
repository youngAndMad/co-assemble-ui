export enum AuthType {
  GITHUB = "GITHUB",
  MANUAL = "MANUAL",
}

export enum SecurityRole {
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
}

type User = {
  id: string;
  email: string;
  username: string;
  provider: AuthType;
  emailVerified: boolean;
  roles: SecurityRole[];
};

export default User;
