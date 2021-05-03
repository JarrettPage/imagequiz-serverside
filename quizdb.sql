create table imagequiz.flowers
(
	id bigserial primary key,
	name text not null,
	picture text not null
);

create table imagequiz.questions
(
	id bigserial primary key,
	flowerid integer references imagequiz.flowers(id),
	choices text not null,
	answer text not null
);

create table imagequiz.quizzes
(
	id bigserial primary key,
	quiznumber integer not null,
	questionid integer references imagequiz.questions(id)
);

create table imagequiz.customers
(
	id bigserial primary key,
	name text not null,
	email text not null,
	password text not null
);

create table imagequiz.scores
(
	id bigserial primary key,
	customerid integer references imagequiz.customers(id),
	quiznumber integer not null,
	score integer not null
);