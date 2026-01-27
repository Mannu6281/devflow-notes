import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    problem:{
        type: String,
        required: true
    },
    targetUsers:{
        type: String,
        required: true
    }, 
    techStack:{
        type: String,
        required:true
    },
},
{timestamps: true}
)

const Project= mongoose.model('Project',projectSchema)

export default Project;