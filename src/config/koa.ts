import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Application from 'koa';


export default class MainApplication {
    private port: Number = Number(process.env.PORT) || 3000;
    public app: Application = new Koa();

    private middlewares(): void {
        this.app.use(bodyParser());
    }

    public async listen(): Promise<void> {
        // Init middlewares
        this.middlewares()

        this.app.listen(this.port, () => {
            console.log(`server is running on port ${this.port}`)
        })
    }
}
