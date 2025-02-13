import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Application from 'koa';
import initRoutes from './routes';
import { globalErrorHandlerMiddleware } from '@/infrastructure/middlewares/globalErrorHandler.middleware';
import { permissionSeed } from '@/infrastructure/seeds/Permission.seed';
import { operationSeed } from '@/infrastructure/seeds/Operation.seed';

export default class MainApplication {
    private port: Number = Number(process.env.PORT) || 3000;
    public app: Application = new Koa();

    private middlewares(): void {
        this.app.use(globalErrorHandlerMiddleware);
        this.app.use(bodyParser());
    }

    public async listen(): Promise<void> {
        // Init seeds
        await permissionSeed();
        await operationSeed();

        // Init middlewares
        this.middlewares();

        initRoutes(this.app);

        this.app.listen(this.port, () => {
            console.log(`server is running on port ${this.port}`)
        })
    }
}
