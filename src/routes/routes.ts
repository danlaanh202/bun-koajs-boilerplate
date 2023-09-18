import Router from "koa-router";
import * as testController from "../controllers/testController";
import testMiddleware from "../middleware/testMiddleware";

const router = new Router({
  prefix: "/api",
});

router.get("/", testMiddleware, testController.test);

export default router;
