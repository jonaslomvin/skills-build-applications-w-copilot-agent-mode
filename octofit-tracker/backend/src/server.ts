import express from 'express';
import './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});