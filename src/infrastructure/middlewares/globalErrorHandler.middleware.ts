import { Context, Next } from "koa";
import { Prisma } from "@prisma/client";
import { ValidationError } from "yup";

export async function globalErrorHandlerMiddleware(ctx: Context, next: Next) {
    try {
        await next();
    } catch (error: any) {
        let statusCode = 500;
        let message = "Erro interno no servidor";

        if (error instanceof ValidationError) {
            statusCode = 400;
            message = `${error.message}`
        }

        if (error instanceof Prisma.PrismaClientValidationError) {
            statusCode = 400;
            message = "Verifique se todos os campos obrigatórios foram preenchidos corretamente.";
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2002":
                    statusCode = 400;
                    message = "Já existe um registro com este valor único";
                    break;
                case "P2003":
                    statusCode = 400;
                    message = "Violação de chave estrangeira";
                    break;
                case "P2025":
                    statusCode = 404;
                    message = "Registro não encontrado";
                    break;
                default:
                    statusCode = 500;
                    message = "Erro desconhecido no banco de dados";
            }
        }

        ctx.status = statusCode;
        ctx.body = {
            error: {
                status: statusCode,
                message,
                details: String(error),
            },
        };
    }
}
