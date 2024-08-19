import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
// import path from 'node:path';

import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { swaggerDocs } from './middleware/swaggerDocs.js';
import { UPLOAD_DIR } from './constants/index.js';

async function setupServer() {
  try {
    const app = express();
    // app.use(express.static(path.resolve('uploads')));
    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use('/api-docs', swaggerDocs());

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
