import { IUser } from "../../interfaces/apiInterface";

export function userPresenter(user: IUser) {
  const { password, ...presentedUser } = user;
  return presentedUser;
}
