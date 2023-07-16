import SubjectModel from "../models/Subject.js";
import { informAboutError } from "../utils/informAboutError.js";



export const getByCourse = async (req, res) => {
    try {
        const  course  = req.body.course;
        if (course) {
            const subjects = await SubjectModel.find({ course, })
            return res.json(subjects);
        }
        const subjects = await SubjectModel.find();
        res.json(subjects );
    } catch (error) {
        informAboutError(error, 500, "Can't get subjects",res);
    }
}



export const getOne = async (req, res) => {

    try {
        const subjectId = req.params.id;
        const subject = await SubjectModel.find({_id: subjectId});

        res.json(subject);
    } catch (error) {
        informAboutError(error, 500, "Can't get subject",res);
    }
}

export const update = async (req, res) => {

    try {
        const subjectId = req.params.id;

        const subject = await SubjectModel.findOneAndUpdate(
            {_id: subjectId},
            {
                name: req.body.name,
                course: req.body.course,    
            },
            {new:true});
        res.json(subject);
    } catch (error) {
        informAboutError(error, 500, "Can't get subject",res);
    }
}

export const create = async (req, res) => {

    try {

        const doc =  new SubjectModel(
            {
                name: req.body.name,
                course: req.body.course,    
            });
        const subject = await doc.save();
        res.json(subject);
    } catch (error) {
        informAboutError(error, 500, "Can't create subject", res);
    }
}

export const remove = async (req, res) => {
    try {
        const subjectId = req.params.id;

        const doc = await SubjectModel.findOneAndDelete(
            {
                _id: subjectId,
            })
        if (!doc) {
            return informAboutError(error, 404, "Subject is not found", res);
        }
        res.json({
            success: true,
        })    
    }
    catch (error) {
        return informAboutError(error, 500, "Can't delete subject", res);

    }
}
