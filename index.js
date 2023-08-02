import express from 'express';
import mongoose from 'mongoose';
import subjectRouts from  './routes/api/subjects.js'
import topicRouts from  './routes/api/topics.js'
import questionRouts from  './routes/api/questions.js'
import sessionRouts from './routes/api/session.js'
import userRouts from  './routes/api/user.js'
import authRouts from  './routes/auth.js'
import registerRouts from  './routes/register.js'
import refreshTokenRouts from './routes/refresh.js'
import logoutRouts from './routes/logout.js'
import { verifyJWT } from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());

app.use(cookieParser());


mongoose
    .connect('mongodb://127.0.0.1/TestsForUniversitySubjects')
    .then(() => console.log("DB is ok"))
    .catch((err) => console.log("DB error ", err))
  



app.use("/auth",authRouts)
app.use("/register",registerRouts)
app.use("/refresh",refreshTokenRouts)
app.use("/logout",logoutRouts)
app.use(verifyJWT);
app.use("/user",userRouts)

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