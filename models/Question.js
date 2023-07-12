import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        task: {
            type: String,
            required: true,
        },
        answerOptions: [{type: String}],
        correctAnswer: {
            type: String
        },
        topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'topic',
            required: true,
        }
    }
)


export default mongoose.model('Question', QuestionSchema);