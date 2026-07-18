import { model, models, Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    targetDurationMinutes: {
        type: Number,
        required: true,
        min: 1,
    },
    tags: {
        type: [String],
        default: [],
    },
    instructions: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});
export const Workout = models.Workout || model('Workout', workoutSchema);
