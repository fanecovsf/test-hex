import Router from "@koa/router";
import { PrismaUserRepository } from "../adapters/user-repository.adapter";
import { CreateUserDTO } from "@/application/dtos/User.dto";
import { validate } from "../middlewares/schemaValidation.middleware";
import { UserService } from "@/services/User.service";
import { Context } from "koa";
import { array, object, string } from "yup";
import { uuidRegex } from "@/utils/regex";
import { uuidSchema } from "@/utils/schemas/uuidSchema";

const router = new Router();
const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);

const userSchema = object({
    email: string().email().required(),
    password: string().required().min(6),
    permissions: array().of(string().matches(uuidRegex, "UUID Inválido")).optional()
}).noUnknown('Campo desconhecido').strict();

const userEditSchema = object({
    email: string().email().optional(),
    permissions: array().of(string().matches(uuidRegex, "UUID Inválido")).optional()
}).noUnknown('Campo desconhecido').strict();

interface UserRequestBody {
    email: string,
    password?: string,
    permissions?: string[]
};


router.post("/users", validate(userSchema), async (ctx: Context) => {
    const body = ctx.request.body as UserRequestBody;
    const dto = new CreateUserDTO(body.email, body.password?? "");
    const user = await userService.createUser(dto);
    ctx.body = user;
})

router.get("/users/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    await uuidSchema.validate(id);
    const user = await userService.getUserById(id);
    if (!user) {
        ctx.status = 404;
        ctx.body = {
            error: 'not found',
            message: 'Usuário não encontrado'
        }
        return
    }
    ctx.body = user;
})

router.get("/users", async (ctx: Context) => {
    const users = await userService.getAllUsers(ctx.query?? {});
    ctx.body = users;
})

router.put("/users/:id", validate(userEditSchema), async (ctx: Context) => {
    const { id } = ctx.params;
    await uuidSchema.validate(id);
    const body = ctx.request.body as UserRequestBody;
    const { permissions, ...rest } = body;
    const user = await userService.editUser(id, rest, permissions?? []);
    ctx.body = user;
})

router.delete("/users/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    await uuidSchema.validate(id);
    const user = await userService.deleteUser(id);
    ctx.body = {
        message: "Usuário deletado com sucesso",
        user
    }
})

export default router;
