import { Router } from 'express';
import { apiBaseUrl, port } from '../config/api.js';

const healthRouter = Router();

healthRouter.get('/', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    port,
    apiBaseUrl,
  });
});

export default healthRouter;