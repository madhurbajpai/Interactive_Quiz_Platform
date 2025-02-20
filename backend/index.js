import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

import questions from './questions.json' assert { type: 'json' };

app.get('/questions', (req, res) => {
    res.json(questions);
});
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});