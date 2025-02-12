import userRouter from "@/infrastructure/controllers/User.controller";
import permissionRouter from "@/infrastructure/controllers/Permissions.controller"
import Application from "koa";

export default function initRoutes(app: Application): void {
    app.use(userRouter.routes());
    app.use(permissionRouter.routes());
}
