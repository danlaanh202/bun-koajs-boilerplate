import { Context } from "koa";
import { getUsers } from "../repositories/userRepository";

export async function getAllUsers(ctx: Context) {
    try {
        const users = await getUsers();
        return (ctx.body={
            data: users,
            success: true
        })
    } catch (error) {
        console.log(error);
        return (ctx.body={
            data: [],
            success: false
        })
    }
}