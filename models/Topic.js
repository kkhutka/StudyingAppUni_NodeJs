import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subject: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            required: true,
        },
        duration: {
            type: Number,
            default: 1000*10*60
        },
        amountOfQuestions: {
            type: Number,
            default: 10,
        }
    }
)


export default mongoose.model('Topic', TopicSchema);