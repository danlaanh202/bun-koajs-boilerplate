export interface IUser {
  id?: string;
  username: string;
  password: string;
  refreshToken: string;
  accessToken?: string;
}
