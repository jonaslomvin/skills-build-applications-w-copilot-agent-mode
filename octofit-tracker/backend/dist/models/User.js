import { model, models, Schema } from 'mongoose';
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fitnessLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    goals: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});
export const User = models.User || model('User', userSchema);
