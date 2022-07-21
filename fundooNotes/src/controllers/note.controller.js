import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';



export const addNote = async (req, res, next) => {
    try {
        console.log("req.body",req.body)
      const data = await NoteService.addNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const getAllNotes = async (req, res, next) => {
  try {
        console.log("req.body",req.body)
        const data = await NoteService.getAllNotes(req.body);
        res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All notes fetched successfully'
    });
    } catch (error) {
     next(error);
    }
    };

    export const getNote = async (req, res, next) => {
  try {
    console.log("req.body",req.body)
    const data = await NoteService.getNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
    try {
      const data = await NoteService.updateNote(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  export const deleteNotes = async (req, res, next) => {
    try {
        const data = await NoteService.deleteNotes(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data:[],
            message: 'Notes deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const archiveNotes = async(req,res,next) =>{
    try{
        const data = await NoteService.archiveNotes(req.params._id,req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data:data,
            message: 'Note Archived Successfully'
        });
    }catch (error) {
        next(error);
    }
}

export const isTrash = async(req,res,next) =>{
    try{
        const data = await NoteService.isTrash(req.params._id,req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data:data,
            message: 'Notes Are In Trash'
        });
    }catch (error) {
        next(error);
    }
}

 