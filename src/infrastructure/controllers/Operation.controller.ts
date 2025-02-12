import Router from "@koa/router";
import { PrismaOperationRepository } from "../adapters/operation-repository.adapter";
import { CreateOperationDTO } from "@/application/dtos/Operation.dto";
import { validate } from "../middlewares/schemaValidation.middleware";
import { OperationService } from "@/services/Operation.service";
import { Context } from "koa";
import { object, string } from "yup";
import { uuidSchema } from "@/utils/schemas/uuidSchema";

const router = new Router();
const operationRepository = new PrismaOperationRepository();
const operationService = new OperationService(operationRepository);

const operationSchema = object({
    name: string().required()
}).noUnknown('Campo desconhecido').strict();

const operationEditSchema = object({
    name: string().optional()
}).noUnknown('Campo desconhecido').strict();

interface OperationRequestBody {
    name: string
}

router.post("/operations", validate(operationSchema), async (ctx: Context) => {
    const body = ctx.request.body as OperationRequestBody;
    const dto = new CreateOperationDTO(body.name);
    const operation = await operationService.createOperation(dto);
    ctx.body = operation;
})

router.get("/operations", async (ctx: Context) => {
    const operations = await operationService.getAllOperations(ctx.query?? {});
    ctx.body = operations;
})

router.get("/operations/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    await uuidSchema.validate(id);
    const operation = await operationService.getOperationById(id);
    ctx.body = operation;
})

router.put("/operations/:id", validate(operationEditSchema), async (ctx: Context) => {
    const { id } = ctx.params;
    await uuidSchema.validate(id);
    const body = ctx.request.body as OperationRequestBody;
    const operation = await operationService.editOperation(id, body);
    ctx.body = operation;
})

router.delete("/operations/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    await uuidSchema.validate(id);
    const operation = await operationService.deleteOperation(id);
    ctx.body = {
        message: "Operação deletada com sucesso",
        operation
    }
})

export default router;
