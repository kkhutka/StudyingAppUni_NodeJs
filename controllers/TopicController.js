
import TopicModel from "../models/Topic.js";
import { informAboutError } from "../utils/informAboutError.js";



export const getBySubjectAndCourse = async (req, res) => {
    try {
        const course  = req.body.course;
        const subjectName = req.body.subjectName;  
        if (course && subjectName) {
            const topics = await TopicModel.find()
                .populate({
                    path: 'subject',
                    match: { name: subjectName, course }
                })
                .exec();
            return res.json(topics);
        }
        const topics = await TopicModel.find().populate('subject');
        res.json(topics);
    } catch (error) {
        informAboutError(error, 500, "Can't get topics",res);
    }
}

export const getOne = async (req, res) => {

    try {
        const topicId = req.params.id;

        const topic = await TopicModel.find({_id: topicId}).populate('subject');
        res.json(topic);
    } catch (error) {
        informAboutError(error, 500, "Can't get topic",res);
    }
}

export const update = async (req, res) => {

    try {
        const topicId = req.params.id;

        const topic = await TopicModel.findOneAndUpdate(
            {_id: topicId},
            {
                name: req.body.name,
                subject: req.body.subjectId,
            },
            {new:true});
        res.json(topic);
    } catch (error) {
        informAboutError(error, 500, "Can't update topic",res);
    }
}

export const create = async (req, res) => {
    try {

        const doc =  new TopicModel(
            {
                name: req.body.name,
                subject: req.body.subjectId,
            });
        const topic = await doc.save();
        res.json(topic);
    } catch (error) {
        informAboutError(error, 500, "Can't create topic", res);
    }
}

export const remove = async (req, res) => {
    try {
        const topicId = req.params.id;

        const doc = await TopicModel.findOneAndDelete(
            {
                _id: topicId,
            })
        if (!doc) {
            return informAboutError(error, 404, "topic is not found", res);
        }
        res.json({
            success: true,
        })    
    }
    catch (error) {
        return informAboutError(error, 500, "Can't delete topic", res);

    }
}
