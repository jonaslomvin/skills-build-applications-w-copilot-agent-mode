import { Router } from 'express';
import { User } from '../models/User.js';
const usersRouter = Router();
usersRouter.get('/', async (_request, response) => {
    const users = await User.find().sort({ createdAt: -1 }).limit(25).lean();
    response.json(users);
});
usersRouter.post('/', async (request, response) => {
    const user = await User.create(request.body);
    response.status(201).json(user);
});
export default usersRouter;
