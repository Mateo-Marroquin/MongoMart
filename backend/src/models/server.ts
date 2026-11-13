import cors from 'cors';
import express, { type Application } from 'express';
import { connectDB } from '../database/config.ts';
import productsRouter from '../routes/products.router.ts';

export class Server {
  private readonly app: Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env['PORT'] ?? 3000);
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/api/products', productsRouter);
  }

  public async listen(): Promise<void> {
    await connectDB();
    this.app.listen(this.port, () => {
      console.log(`MongoMart API escuchando en el puerto ${this.port}`);
    });
  }
}
