export interface NotOk {
  error: string;
}
export interface User {
  email: string;
  username?: string;
  password: string;
}

export type Users = User[];
