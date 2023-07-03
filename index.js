import express from 'express';
import mongoose from 'mongoose';
import subjectRouts from  './routes/api/subjects.js'
import topicRouts from  './routes/api/topics.js'
import testRouts from  './routes/api/tests.js'
const app = express();

app.use(express.json());

const router = express.Router();



mongoose
    .connect('mongodb://localhost:27017/TestsForUniversitySubjects')
    .then(() => console.log("DB is ok"))
    .catch((err) => console.log("DB error ", err))



app.use("/subjects", subjectRouts)
app.use("/topics",topicRouts)
app.use("/tests",testRouts)


app.all('*', (req, res) => {
    res.status(404);
    res.json({
        "message": "Not Found"
    })
});

app.listen(3500, () => {
    console.log("Server is running on port 3000");
  });