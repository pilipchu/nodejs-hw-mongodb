import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';

import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

async function setupServer() {
  try {
    const app = express();
    app.use(express.json());

    app.use(cors());
    app.use(cookieParser());
    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    const PORT = Number(env('PORT', '3000'));

    app.use(router);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default setupServer;
