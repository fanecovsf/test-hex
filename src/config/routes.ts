import userRouter from "@/infrastructure/controllers/User.controller";
import Application from "koa";

export default function initRoutes(app: Application): void {
    app.use(userRouter.routes());
}
