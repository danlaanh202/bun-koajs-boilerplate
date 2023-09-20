import Router from "koa-router";
import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";

const router = new Router({
  prefix: "/api",
});

router.get("/users", verifyToken, userController.getAllUsers);

export default router;
