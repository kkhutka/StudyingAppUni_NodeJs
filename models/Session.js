import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        start: {
            type: Date,
            default: Date.now(),
            required: true,
          },
          end: {
            type: Date,
            required: true,
          },
          topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'topic'
          },
          submitTime: {
            type: Date,
            default: null,
          },
          amountOfQuestions: {
            type: Number,
            required: true
          },
          answers: [
            {
                question: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
                },
                selectedOption: {
                    type: String,
                    default: '',
                },
                isCorrect: {
                    type: Boolean,
                    default: false,
                }
            }
          ]
    }
)



export default mongoose.model('Session', SessionSchema);