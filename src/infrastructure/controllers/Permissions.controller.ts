import Router from "@koa/router";
import { PrismaPermissionRepository } from "../adapters/permission-repository.adapter";
import { PermissionService } from "@/services/Permission.service";
import { Context } from "koa";
import { uuidSchema } from "@/utils/schemas/uuidSchema";

const router = new Router();
const permissionsRepository = new PrismaPermissionRepository();
const permissionService = new PermissionService(permissionsRepository);


router.get("/permissions", async (ctx: Context) => {
    const permissions = await permissionService.getAllPermissions();
    ctx.body = permissions;
})

router.get("/permissions/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    await uuidSchema.validate(id);
    const permission = await permissionService.getPermissionById(id);
    ctx.body = permission;
})

export default router;
