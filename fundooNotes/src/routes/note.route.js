import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { noteValidator } from '../validators/note.validator';
import { redisAuth }  from '../middlewares/redis.middleware'
const router = express.Router();

//router to create note
router.post('', noteValidator, userAuth, noteController.addNote);

//router to get all the notes
router.get('', userAuth, redisAuth ,noteController.getAllNotes);

//router to get a single note
router.get('/:_id', userAuth, noteController.getNote);

//router to update note
router.put('/:_id', userAuth, noteController.updateNote);

//router to delete note
router.delete('/:id', userAuth, noteController.deleteNotes);

//router to archive notes
router.put('/:_id/isArchive', userAuth, noteController.archiveNotes);

//router to isDelete
router.put('/:_id/isDelete', userAuth, noteController.isTrash);


export default router
