import SessionModel from "../models/Session.js";
import QuestionModel from "../models/Question.js";
import { informAboutError } from "../utils/informAboutError.js";
import TopicModel from "../models/Topic.js";
import submitAnswers from "../services/submissionService.js"




export const createSession =  async ( req, res ) => {
    try {
        //duration in ms
        // треба буде брати юзера з jwt token-а потім пофіксити
        const userId = req.user;
        const {topicId} = req.body;
        const topic = await TopicModel.findOne({id:topicId})
        const {duration, amountOfQuestions} = topic;
        const end = Date.now() + duration
        const questions = await QuestionModel.aggregate([
            { $match: { topic: topicId } }, 
            { $sample: { size: amountOfQuestions } },
        ]);
       
        const answers = questions.map((item) => ({
            question: item._id,
            isCorrect: false,
            selectedOption: '',
        })); // Extract the question IDs

        const doc = new SessionModel({
            user: userId,
            topic: topicId,
            start: Date.now(),
            end: Date.now() + duration,
            amountOfQuestions,
            answers,
        })
        const session = await doc.save();
        const remainingTime = end - Date.now();
        setTimeout(async () => {
            await submitAnswers(session._id);
        }, remainingTime);
        return res.json({
            session,
        })
    } catch (error) {
        informAboutError(error,500, "Can create session", res);
    }
}


export const submitSession = async (req, res) => {
    try {

        const { sessionId } = req.body;
        // console.log(sessionId);
        // Retrieve the session based on the session ID
        const session = await submitAnswers(sessionId)
        res.json(session);
    } catch (error) {
        informAboutError(error, 500, "Failed to submit answers", res);
    }
  };




export const getSession = async (req,res)=> {

   try {
        const sessionId  = req.params.id;
 
        const session = await SessionModel.findById(sessionId);

        return res.json(session)

   } catch (error) {
        informAboutError(error, 404, "Cant  find session", res);
   }
}

export const isSessionStarted = async (req,res)=> {

   try {
        const  topicId  = req.params.id;
        const userId = req.user;
        const sessionsWithThisTopic = await SessionModel.find(
            {
                topicId: topicId,
                userId: userId
            })
            .populate('topic', ['name', 'duration']) 
            .populate({
                path: 'answers.question', 
                model: 'question',
                select: ['answerOptions', 'name', 'task', 'imageUrl']
            });

        const session = sessionsWithThisTopic.find(session => session.submitTime === null);

        return session ? res.json(session) : informAboutError(null, 404, "No started session found", res);


   } catch (error) {
        informAboutError(error, 404, "No started session found", res);
   }
}


export const updateAnswer = async (req, res) => {
    try {
        
      const sessionId = req.params.id
      const { questionId, selectedOption } = req.body;
  
      const session = await SessionModel.findById(sessionId);
      if (session.submitTime) {
        return res.status(500).json({ message: "Test already submitted" });
      }  
      const answer = session.answers.find((ans) => ans.question.toString() === questionId);
  
      if (answer) {
        answer.selectedOption = selectedOption;
      }
  

      await session.save();
  
      res.status(200).json({ message: "Answer updated successfully" });
    } catch (error) {
      informAboutError(error, 500, "Failed to update answer", res);
    }
};