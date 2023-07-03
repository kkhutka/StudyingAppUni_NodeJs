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
        }
    }
)


export default mongoose.model('Topic', TopicSchema);