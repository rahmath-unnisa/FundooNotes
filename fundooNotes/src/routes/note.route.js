import express from 'express';
import * as noteController from '../controllers/note.controller';
import  {userAuth} from '../middlewares/auth.middleware';
import { noteValidator } from '../validators/note.validator';
const router = express.Router();

router.post('', userAuth, noteValidator, noteController.addNote );

router.get('', userAuth, noteController.getAllNotes);

router.get('/:_id', userAuth,  noteController.getNote);

router.put('/:_id', userAuth, noteController.updateNote);


export default router
