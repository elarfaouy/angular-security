export interface User {
  username: string;
  password: string;
  role: object | string | null;
  permissions: string[] | null;
}
