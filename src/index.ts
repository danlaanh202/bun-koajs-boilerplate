import App from "koa";
import router from "./routes/routes";

const app = new App();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 8080, () => {
  console.log("listening on port 8080");
});
