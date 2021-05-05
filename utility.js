

let convertQuiz = (quiz) => {
    let result = {quiznumber: quiz.quiznumber, questions: []};
    for(let i = 0; i < quiz.questions.length; i++) {
        let q = {flower: quiz.questions[i].flower, answer: quiz.questions[i].answer.trim(), choices: []};
        q.choices = quiz.questions[i].choices.split(",");
        for(let j = 0; j < q.choices.length; j++){
            q.choices[j] = q.choices[j].trim();
        }
        result.questions.push(q);
    }
    return result;
}

module.exports = { convertQuiz };