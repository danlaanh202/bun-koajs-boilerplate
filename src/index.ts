import App from "koa";
import apiRouter from "./routes/api";
import authRouter from "./routes/auth";
import bodyParser from "koa-bodyparser";
const app = new App();

app.use(bodyParser());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.listen(process.env.PORT || 8080, () => {
  console.log("listening on port 8080");
});
