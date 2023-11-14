import 'express-async-errors';
import express, {Express} from 'express';
import { connectDb, disconnectDB, loadEnv } from './config';
import { handleApplicationErrors } from './middlewares';

loadEnv();

const app = express();

app
.use(express.json())
.get('/health', (_req, res) => res.send("I'm alive!"))
.use('',)
.use(handleApplicationErrors);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
  }
  
  export default app;