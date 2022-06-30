import Note from '../models/note.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const addNote = async (body) => {
    const data = await Note.create(body);
    return data;
  };
  export const getAllNotes = async(body) => {
    const data = await Note.find(body);
    return data;
  };
  export const getNote= async (_id) => {
    const data = await Note.findById(_id);
    return data;
  };
  

export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

export const deleteNote = async (id) => {
  await User.findByIdAndDelete(_id);
  return '';
};