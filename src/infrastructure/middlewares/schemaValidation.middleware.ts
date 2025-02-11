import { Context, Next } from 'koa';
import { ObjectSchema } from 'yup';

export const validate = (schema: ObjectSchema<any>) => {
    return async (ctx: Context, next: Next) => {
        try {
            ctx.request.body = await schema.validate(ctx.request.body);
            await next();
        } catch (e) {
            const error = e as Error;
            ctx.status = 400;
            ctx.body = {
                error: 'validation error',
                message: `Erro de validação: ${error.message}`
            }
        }
    }
}
