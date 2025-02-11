import Router from "@koa/router";
import { PrismaUserRepository } from "../adapters/user-repository.adapter";
import { CreateUserDTO } from "@/application/dtos/User.dto";
import { validate } from "../middlewares/schemaValidation.middleware";
import { UserService } from "@/services/User.service";
import { Context } from "koa";
import { object, string } from "yup";

const router = new Router();
const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);

const userSchema = object({
    email: string().email().required(),
    password: string().required().min(6)
});

interface UserRequestBody {
    email: string,
    password: string
}

router.post("/users", validate(userSchema), async (ctx: Context) => {
    const body = ctx.request.body as UserRequestBody;
    const dto = new CreateUserDTO(body.email, body.password);
    const user = await userService.createUser(dto);
    ctx.body = user;
})

router.get("/users/:id", async (ctx: Context) => {
    const { id } = ctx.params;
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

export default router;
