import express from 'express';
import mongoose from 'mongoose';
import subjectRouts from  './routes/api/subjects.js'
import topicRouts from  './routes/api/topics.js'
import questionRouts from  './routes/api/questions.js'
import sessionRouts from './routes/api/session.js'
const app = express();

app.use(express.json());



mongoose
    .connect('mongodb://127.0.0.1/TestsForUniversitySubjects')
    .then(() => console.log("DB is ok"))
    .catch((err) => console.log("DB error ", err))



app.use("/subjects", subjectRouts)
app.use("/topics",topicRouts)
app.use("/questions",questionRouts)
app.use("/session", sessionRouts)


app.all('*', (req, res) => {
    res.status(404);
    res.json({
        "message": "Not Found"
    })
});

app.listen(3500, () => {
    console.log("Server is running on port 3500");
});