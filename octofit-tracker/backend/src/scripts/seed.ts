import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
import { rebuildLeaderboard } from '../services/rebuildLeaderboard.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [ava, marco] = await User.create([
      {
        name: 'Ava Stone',
        email: 'ava@octofit.dev',
        fitnessLevel: 'advanced',
        goals: ['Strength', 'Endurance'],
      },
      {
        name: 'Marco Reed',
        email: 'marco@octofit.dev',
        fitnessLevel: 'intermediate',
        goals: ['Mobility', 'Consistency'],
      },
    ]);

    const [summitSquad] = await Team.create([
      {
        name: 'Summit Squad',
        slug: 'summit-squad',
        description: 'A team focused on weekly endurance goals.',
        memberIds: [ava._id, marco._id],
      },
    ]);

    await Activity.create([
      {
        userId: ava._id,
        teamId: summitSquad._id,
        type: 'run',
        durationMinutes: 48,
        caloriesBurned: 520,
        notes: 'Hill repeats and cooldown jog.',
      },
      {
        userId: marco._id,
        teamId: summitSquad._id,
        type: 'yoga',
        durationMinutes: 35,
        caloriesBurned: 180,
        notes: 'Mobility reset session.',
      },
    ]);

    await Workout.create([
      {
        title: 'Leaderboard Builder',
        category: 'Conditioning',
        difficulty: 'intermediate',
        targetDurationMinutes: 40,
        tags: ['cardio', 'team'],
        instructions: ['Warm up for 5 minutes.', 'Alternate sprint and recovery intervals.', 'Finish with a core circuit.'],
      },
      {
        title: 'Recovery Flow',
        category: 'Mobility',
        difficulty: 'beginner',
        targetDurationMinutes: 20,
        tags: ['stretching', 'recovery'],
        instructions: ['Start with deep breathing.', 'Move through hip and thoracic stretches.', 'Hold each position for 45 seconds.'],
      },
    ]);

    await rebuildLeaderboard();

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
