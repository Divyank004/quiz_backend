## Environment Variables
Define the following env variables in .env file
```
NODE_ENV
DB_DEV_HOST
DB_DEV_PORT
DB_DEV_DBNAME
DB_DEV_USER
DB_DEV_PASS
PORT
```

## Create a postgres db with following tables:

CREATE DATABASE quiz;
```
CREATE TABLE public.question (

	"ID" serial4 NOT NULL,

	description varchar NOT NULL,

	CONSTRAINT question_pk PRIMARY KEY ("ID")

);
```
```
CREATE TABLE public."option" (

	"ID" serial4 NOT NULL,

	description varchar NOT NULL,

	"questionID" int4 NOT NULL,

	"isRightAnswer" bool NULL DEFAULT false,

	CONSTRAINT option_pk PRIMARY KEY ("ID"),

	CONSTRAINT "option_question_FK" FOREIGN KEY ("questionID") REFERENCES public.question("ID")

);
```
## Run
```
npm install
npm run start
```

Server should be up and running under http://localhost:PORT
