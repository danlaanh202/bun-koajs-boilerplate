import { Context } from "koa";
import * as userRepository from "../repositories/userRepository";
import jwt from "jsonwebtoken";
import cryptoJs from "crypto-js";
import { ILogin } from "../interfaces/authInterfaces";
import { userPresenter } from "../helpers/presenters/userPresenter";

export async function login(ctx: Context) {
  const { username, password } = ctx.request.body as ILogin;
  try {
    const user = await userRepository.login({ username, password });
    return (ctx.body = {
      data: userPresenter(user),
      success: true,
    });
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      success: false,
    });
  }
}

export async function refreshAccessToken(ctx: Context) {
  try {
    const accessToken = await userRepository.refreshAccessToken(ctx._userId);
    return (ctx.body = {
      data: accessToken,
    });
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      success: false,
    });
  }
}
