import QuestionModel from "../models/Question.js";


import { informAboutError } from "../utils/informAboutError.js";



export const getQuestionsByCourseAndSubjectAndTopic = async (req, res) => {
    try {
      const { course, subject, topic } = req.query;
  
      let query = {};
  
      if (course) {
        query['topic.subject.course'] = course;
      }
  
      if (subject) {
        query['topic.subject.name'] = subject;
      }
  
      if (topic) {
        query['topic.name'] = topic;
      }
  
      const questions = await QuestionModel.find(query).populate('topic');
  
      res.json(questions);
    } catch (error) {
      informAboutError(error, 500, "Can't get Questions", res);
    }
  };

  export const getQuestion = async (req, res) => {
    try {
      const questionId = req.params.id;
  
      const question = await QuestionModel.findById(questionId).populate('topic');
      if (!question) {
        informAboutError(error, 404, "Can't find Question", res);
      }
  
      res.json(question);
    } catch (error) {
      informAboutError(error, 500, "Can't get Question", res);
    }
  };

export const updateQuestion = async (req, res) => {

    try {
        const questionId = req.params.id;

        const question = await TopicModel.findOneAndUpdate(
            {_id: questionId},
            {
                name: req.body.name,
                task: req.body.task,
                topic: req.body.topicId,
                asnwerOptions: req.body.asnwerOptions,
                correctAnswer: req.body.correctAnswer,
                imageUrl: req.body.imageUrl,
            },
            {new:true});
        res.json(question);
    } catch (error) {
        informAboutError(error, 500, "Can't update Question",res);
    }
}

export const createQuestion = async (req, res) => {

    try {
        const doc =  new QuestionModel(
            {
                name: req.body.name,
                task: req.body.task,
                topic: req.body.topicId,
                answerOptions: req.body.answerOptions,
                correctAnswer: req.body.correctAnswer,
                imageUrl: req.body.imageUrl,
            });
        const question = await doc.save();
        res.json(question);
    } catch (error) {
        informAboutError(error, 500, "Can't create Question", res);
    }
}

export const removeQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;

        const doc = await QuestionModel.findOneAndDelete(
            {
                _id: questionId,
            })
        if (!doc) {
            return informAboutError(error, 404, "Question is not found", res);
        }
        res.json({
            success: true,
        })    
    }
    catch (error) {
        return informAboutError(error, 500, "Can't delete Question", res);

    }
}





