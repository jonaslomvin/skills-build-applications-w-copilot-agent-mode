import { Router } from 'express';
import { Team } from '../models/Team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  const teams = await Team.find()
    .sort({ totalPoints: -1, createdAt: -1 })
    .populate('memberIds', 'name email')
    .lean();
  response.json(teams);
});

teamsRouter.post('/', async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json(team);
});

export default teamsRouter;