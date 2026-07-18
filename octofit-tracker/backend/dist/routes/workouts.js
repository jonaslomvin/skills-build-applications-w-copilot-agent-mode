import { Router } from 'express';
import { Workout } from '../models/Workout.js';
const workoutsRouter = Router();
workoutsRouter.get('/', async (_request, response) => {
    const workouts = await Workout.find().sort({ createdAt: -1 }).limit(25).lean();
    response.json(workouts);
});
workoutsRouter.post('/', async (request, response) => {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
});
export default workoutsRouter;
