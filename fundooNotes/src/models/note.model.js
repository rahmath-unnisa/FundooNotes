import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        Title: { type: String, required:true, },
        Description: { type: String, required: true, },
        Color: {  type: String, },
        Trash: { type: Boolean, },

    },
    {
        timestamps: true
      }
    );
    
    export default model('Note', noteSchema);
    