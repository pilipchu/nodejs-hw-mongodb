import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

async function setupServer() {
  try {
    const app = express();
    app.use(cors());
    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    const PORT = Number(env('PORT', '3000'));

    app.get('/contacts', async (req, res) => {
      const contacts = await getAllContacts();

      res.status(200).json({
        status: 200,
        message: `Successfully found contacts`,
        data: contacts,
      });
    });

    app.get('/contacts/:id', async (req, res, next) => {
      const { id } = req.params;
      const contact = await getContactById(id);

      if (!contact) {
        res.status(404).json({
          message: 'Contact not found',
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
      });
    });

    app.use((req, res, next) => {
      res.status(404).send({
        message: 'Not found',
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default setupServer;
