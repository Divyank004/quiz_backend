import { Request, Response } from 'express'
import db from '../models/db'

interface Option {
    description: string,
    isRightAnswer: boolean,
    questionID: number
}
  
interface Question {
    ID: number,
    description: string,
    options: Option[]
}

async function getAllQuestions(req: Request, res: Response){
    const questions: Question[] = await db('question')
        .select({
            ID: 'question.ID',
            description: 'question.description'
        })
    for(const question of questions) {
        const options = await db('option').select({
        description: 'option.description',
        isRightAnswer: 'option.isRightAnswer'
        }).where('questionID', question.ID)
        question.options = options
    }
    res.json(questions);
}

async function postQuestion (req: Request, res: Response)
{
    const trx = await db.transaction()
    console.log(req.body)
    try{
        const question = {
            description: req.body.description,
        }
        const insertedQuestion = await trx('question').insert(question).returning('ID')
        for(const option of req.body.options) {
            await trx('option').insert({
                description: option.description,
                questionID: insertedQuestion[0].ID,
                isRightAnswer: option.isRightAnswer
            })
        }
        await trx.commit()
        res.json({ message: 'Question created successfully' });
    } catch(e) {
        await trx.rollback()
    }
}

export { getAllQuestions, postQuestion }