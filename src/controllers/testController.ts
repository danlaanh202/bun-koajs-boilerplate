import { Context } from "koa";

export async function test(ctx: Context) {
  try {
    return (ctx.body = {
      data: "Hello world",
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
    });
  }
}
