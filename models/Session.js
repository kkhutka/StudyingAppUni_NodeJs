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
          },
          amountOfQuestion: {
            type: int,
            required: true
          },
          questions: [{
            type: mongoose.Schema.Types.ObjectId,
            default: [],
        }]
    }
)


SessionSchema.pre('save', function (next)  {
    if (!this.submitTime && this.endTime <= Date.now()) {
      this.submitTime = Date.now();
    }
    next();
  });

export default mongoose.model('Session', SessionSchema);