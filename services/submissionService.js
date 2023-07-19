
import SessionModel from "../models/Session.js";
import QuestionModel from "../models/Question.js";


export default async (sessionId) => {

    const session = await SessionModel.findById(sessionId);
    if (session.submitTime) {
        return;
      }
    const answers = session.answers; 
    if (answers){

        for (const answer of answers) {
            const questionId = answer.question;
            const selectedOption = answer.selectedOption;
            
            const question = await QuestionModel.findById(questionId);
            const isCorrect = selectedOption === question.correctAnswer;
            
            answer.isCorrect = isCorrect;
        }
        session.answers = answers;
    }
    session.submitTime = Date.now();

    await session.save();
    return session;

}