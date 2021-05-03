require('dotenv').config();
const { Pool } = require('pg');


let host = process.env.host;
let database = process.env.database;
let port = process.env.port;
let username = process.env.dbusername;
let password = process.env.password;


let connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;

let connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl : {rejectUnauthorized: false}
};

const pool = new Pool(connection);

/*
let saveCustomer = (name, email, password) => {
    return pool.query('insert into imagequiz.customers(name, email, password) values ($1, $2, $3, $4) returning id', [name, email, password])
    .then(result => {console.log('The user was saved'); return result.rows[0].id});
}
*/

let saveScore = (username, quiznumber, score) => {
    return pool.query(`insert into imagequiz.scores(customerid, quiznumber, score) 
    values ( 
    (select id from imagequiz.customers 
    where name = $1), 
    $2, $3) `, [username, quiznumber, score])
    .then(() => {console.log('The score was saved'); });
}

let getFlowers = () => {
    let sql = `select f.name, f.picture
    from imagequiz.flowers f `;
    return pool.query(sql)
    .then(result => result.rows);
}

let getQuestions = () => {
    let sql = `select f.picture, q.choices, q.answer
    from imagequiz.questions q
    inner join imagequiz.flowers f
    on q.flowerid = f.id `;
    return pool.query(sql)
    .then(result => result.rows);

}

let getQuizzes = () => {
    let sql = `select q.quiznumber, json_agg(json_build_object('flower', f.picture, 'choices', q2.choices, 'answer', q2.answer)) as questions 
    from imagequiz.quizzes q 
    inner join imagequiz.questions q2 on q.questionid = q2.id 
    inner join imagequiz.flowers f on q2.flowerid = f.id 
    group by q.quiznumber `;
    return pool.query(sql)
    .then(result => result.rows);
}

let findQuiz = (quiz) => {
    let sql = `select q.quiznumber, json_agg(json_build_object('flower', f.picture, 'choices', q2.choices, 'answer', q2.answer)) as questions 
    from imagequiz.quizzes q 
    inner join imagequiz.questions q2 on q.questionid = q2.id 
    inner join imagequiz.flowers f on q2.flowerid = f.id 
    where q.quiznumber = $1 
    group by q.quiznumber `;
    return pool.query(sql, [quiz])
    .then(result => result.rows[0]);
}

module.exports = { saveScore, getFlowers, getQuestions, getQuizzes, findQuiz };