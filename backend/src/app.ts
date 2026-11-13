import { Server } from './models/server.ts';

const server = new Server();

server.listen().catch((error: unknown) => {
  console.error('No se pudo iniciar MongoMart API:', error);
  process.exitCode = 1;
});
