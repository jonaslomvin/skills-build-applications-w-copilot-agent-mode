import express from 'express';
import { port } from './config/api.js';
import './config/database.js';
import apiRouter from './routes/api.js';

const app = express();

app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});