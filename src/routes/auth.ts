import Router from "koa-router";
import * as authController from "../controllers/authController";
import { verifyRefreshToken } from "../middleware/authMiddleware";

const router = new Router({
  prefix: "/auth",
});

// [POST] login and gen RT, AT send {RT, AT, ...userData}
router.post("/login", authController.login);

// [POST] refresh accessToken by RT
router.post("/refresh", verifyRefreshToken, authController.refreshAccessToken);

// router.put("/forget", authController.test);

export default router;
