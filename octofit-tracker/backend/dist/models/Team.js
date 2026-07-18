import { model, models, Schema } from 'mongoose';
const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
    memberIds: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    totalPoints: {
        type: Number,
        default: 0,
        min: 0,
    },
}, {
    timestamps: true,
});
export const Team = models.Team || model('Team', teamSchema);
