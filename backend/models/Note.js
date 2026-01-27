import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },
    title:{
        type: String,
    },
    content:{
        type: String,
        required: true
    }
},{timestamps: true})

const Note = mongoose.model('Note',noteSchema)

export default Note;