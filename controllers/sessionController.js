import SessionModel from "../models/Session.js";
import QuestionModel from "../models/Question.js";
import { informAboutError } from "../utils/informAboutError.js";





export const createSession =  async ( req, res ) => {
    try {
        //duration in ms
        // треба буде брати юзера з jwt token-а потім пофіксити
        const {userId, duration, topicId, amountOfQuestions } = req.body;
        const questions = await QuestionModel.aggregate([
            { $match: { topic: topicId } }, 
            { $sample: { size: amountOfQuestions } },
        ]);
        const doc = new SessionModel({
            user: userId,
            topic: topicId,
            start: Date.now(),
            end: Date.now().getTime() + duration,
            amountOfQuestions,
            questions: questions.map(item => item._id),
        })

        const session = new doc.save();
        return res.json({
            session,
            questions,
        })
    } catch (error) {
        informAboutError(error,500, "Can create session", res);
    }

}