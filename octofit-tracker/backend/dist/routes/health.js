import { Router } from 'express';
const healthRouter = Router();
healthRouter.get('/', (_request, response) => {
    response.json({
        status: 'ok',
        service: 'octofit-tracker-api',
        port: Number(process.env.PORT || 8000),
    });
});
export default healthRouter;
