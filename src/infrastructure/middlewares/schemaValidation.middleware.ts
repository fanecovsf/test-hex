import { Context, Next } from 'koa';
import { ObjectSchema } from 'yup';

export const validate = (schema: ObjectSchema<any>) => {
    return async (ctx: Context, next: Next) => {
        ctx.request.body = await schema.validate(ctx.request.body);
        await next();
    }
}
