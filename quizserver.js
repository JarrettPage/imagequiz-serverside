const express = require('express');
const flowers = require('./flowers');
const quizzes = require('./data');

const app = express();
const port = process.env.PORT || 4002;

app.use(express.json());

let scores = [];

app.get('/', (request, response) => {
    response.send('Welcome to imagequiz serverside.');
});

app.get('/flowers', (request, response) => {
    response.json(flowers);
});

app.get('/quizzes', (request, response) => {
    response.json(quizzes);
});

app.get('/quiz/:id', (request, response) => {
    let id = request.params.id;
    let quiz = quizzes[Number(id)];
    if(quiz) {
        response.json(quiz);
    }
    else {
        response.status(404).send('The quiz number ${id} could not be found.')
    }
});

app.post('/score', (request, response) => {
    let score = request.body.score;
    let quizid = request.body.quizid;
    let username = request.body.username;
    scores.push({score: score, quizid: quizid, username: username});
    response.send('The score was saved successfully.');
});

app.listen(port, () => console.log('Listening on port ' + port));