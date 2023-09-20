import { Context, Next } from "koa";
import { data as users } from "../repositories/users.json";
import jwt from "jsonwebtoken";

export async function verifyToken(ctx: Context, next: Next) {
  try {
    const authHeader = ctx.request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      ctx.status = 404;
      return (ctx.body = {
        success: false,
      });
    }
    jwt.verify(token, process.env.JWT_SECRET as string);

    await next();
  } catch (error) {
    return (ctx.body = {
      success: false,
    });
  }
}

export async function verifyRefreshToken(ctx: Context, next: any) {
  try {
    const authHeader = ctx.request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      ctx.status = 404;
      throw new Error();
    }
    const user = users.find((elem) => elem.refreshToken === token);
    if (!user) {
      ctx.status = 404;
      throw new Error();
    }
    jwt.verify(token, process.env.JWT_SECRET as string);

    await next({ _rfToken: token, _userId: user.id });
  } catch (error) {
    return (ctx.body = {
      success: false,
    });
  }
}
