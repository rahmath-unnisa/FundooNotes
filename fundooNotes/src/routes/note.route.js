import express from 'express';
import * as noteController from '../controllers/note.controller';
import  {userAuth} from '../middlewares/auth.middleware';
const router = express.Router();

router.post('', noteController.addNote );

router.get('', noteController.getAllNotes);

router.get('/:_id',  noteController.getNote);

router.put('/:_id', noteController.updateNote);

router.delete('/:_id',  noteController.deleteNote);
export default router
