import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Descreption: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    
    }
  },
  {
    timestamps: true
  }
);

export default model('note', noteSchema);
