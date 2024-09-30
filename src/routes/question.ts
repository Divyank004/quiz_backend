import {getAllQuestions, postQuestion} from '../controllers/question.controller'
import express, { Request, Response } from 'express'

const router = express.Router()

/* GET questions */
router.get('/', async function(req: Request, res: Response) {
  getAllQuestions(req, res)
});

/* POST questions */
router.post('/', async function(req: Request, res: Response) {
  postQuestion(req, res)
});

export default router;
