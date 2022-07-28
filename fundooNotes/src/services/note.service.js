import Note from '../models/note.model';
import { client } from '../config/redisdatabase';


export const addNote = async (body) => {
  console.log(body);
  const data = await Note.create(body);
  if(data){
    await client.del('AddNote');
  }
  return data;
  };
  export const getAllNotes = async(body) => {
    const data = await Note.find({UserID:body.UserID});
    if(data){
      client.set('AddNote', JSON.stringify(data));
    }
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

export const deleteNotes = async (id) => {
  await Note.findByIdAndDelete(id);
  return '';
};

export const archiveNotes = async(_id,UserID) =>{
  console.log(_id);
  console.log(UserID);
  const data = await Note.findByIdAndUpdate(
    {
     _id:_id,UserID:UserID
    },
    {
      isArchived: true
    },
    {
      new: true
    }
  );
  return data;
}

export const isTrash = async(_id,UserID) =>{
  const data = await Note.findByIdAndUpdate(
    {
      _id:_id,UserID:UserID
    },
    {
      isDeleted: true
    },
    {
      new: true
    }
  );
  return data;
}
