const cors = require('cors');
const express = require('express');
const db = require('./quizdb');

const app = express();
const port = process.env.PORT || 4002;

app.use(express.json());
app.use(cors());

//let scores = [];

app.get('/', (request, response) => {
    response.send('Welcome to imagequiz serverside.');
});

app.get('/flowers', (request, response) => {
    db.getFlowers()
    .then(flowers => response.json(flowers))
    .catch(e => {console.log(e); response.status(500).send('There was a problem getting the flowers.')});
});

app.get('/quizzes', (request, response) => {
    db.getQuizzes()
    .then(quizzes => response.json(quizzes))
    .catch(e => {console.log(e); response.status(500).send('There was a problem getting the quizzes.')});
});

app.get('/quiz/:id', (request, response) => {
    let id = request.params.id;
    let quiznumber = Number(id);
    db.findQuiz(quiznumber)
    .then(quiz => response.json(quiz))
    .catch(e => {console.log(e); response.status(500).send('There was a problem getting the quiz.')});
});
/*
app.post('/customer', (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    db.saveCustomer(name, email, password)
    .then(customerid => db.saveScore())
});
*/
app.post('/score', (request, response) => {
    let score = request.body.score;
    let quiznumber = request.body.quiznumber;
    let username = request.body.username;
    //let email = request.body.email;
    //let password = request.body.email;
    db.saveScore(username, quiznumber, score)
    .then(() => response.send('The score was saved successfully.'))
    .catch(e => {console.log(e); response.status(500).send('There was a problem saving the score.')});
    //scores.push({score: score, quizid: quizid, username: username});
    //response.send('The score was saved successfully.');
});

app.listen(port, () => console.log('Listening on port ' + port));
