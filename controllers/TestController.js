import TestModel from "../models/Test.js";
import { informAboutError } from "../utils/informAboutError.js";



export const getTestsByCourseAndSubjectAndTopic = async (req, res) => {
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
  
      const tests = await TestModel.find(query).populate('topic');
  
      res.json(tests);
    } catch (error) {
      informAboutError(error, 500, "Can't get tests", res);
    }
  };

  export const getTest = async (req, res) => {
    try {
      const testId = req.params.id;
  
      const test = await TestModel.findById(testId).populate('topic');
      if (!test) {
        informAboutError(error, 404, "Can't find test", res);
      }
  
      res.json(test);
    } catch (error) {
      informAboutError(error, 500, "Can't get test", res);
    }
  };

export const updateTest = async (req, res) => {

    try {
        const testId = req.params.id;

        const test = await TopicModel.findOneAndUpdate(
            {_id: testId},
            {
                name: req.body.name,
                task: req.body.task,
                topic: req.body.topicId,
                asnwerOptions: req.body.asnwerOptions,
                correctAnswer: req.body.correctAnswer
            },
            {new:true});
        res.json(test);
    } catch (error) {
        informAboutError(error, 500, "Can't update test",res);
    }
}

export const createTest = async (req, res) => {

    try {

        const doc =  new TopicModel(
            {
                name: req.body.name,
                task: req.body.task,
                topic: req.body.topicId,
                asnwerOptions: req.body.asnwerOptions,
                correctAnswer: req.body.correctAnswer
            });
        const test = await doc.save();
        res.json(test);
    } catch (error) {
        informAboutError(error, 500, "Can't create test", res);
    }
}

export const removeTest = async (req, res) => {
    try {
        const testId = req.params.id;

        const doc = await TopicModel.findOneAndDelete(
            {
                _id: testId,
            })
        if (!doc) {
            return informAboutError(error, 404, "test is not found", res);
        }
        res.json({
            success: true,
        })    
    }
    catch (error) {
        return informAboutError(error, 500, "Can't delete test", res);

    }
}





