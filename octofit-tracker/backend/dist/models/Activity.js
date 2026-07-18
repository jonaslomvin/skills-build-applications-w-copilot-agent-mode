import { model, models, Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        default: null,
    },
    type: {
        type: String,
        enum: ['run', 'ride', 'lift', 'yoga', 'hiit', 'walk', 'swim', 'workout'],
        required: true,
    },
    durationMinutes: {
        type: Number,
        required: true,
        min: 1,
    },
    caloriesBurned: {
        type: Number,
        required: true,
        min: 0,
    },
    notes: {
        type: String,
        default: '',
        trim: true,
    },
    completedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
export const Activity = models.Activity || model('Activity', activitySchema);
