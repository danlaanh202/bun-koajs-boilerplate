import { Context } from "koa";

export default async function testMiddleware(
  ctx: Context,
  next: () => Promise<any>
) {
  try {
    await next();
  } catch (e) {
    return (ctx.body = {
      success: false,
    });
  }
}
