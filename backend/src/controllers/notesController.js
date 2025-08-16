const Note = require("../models/Note.js")
async function getAllNotes(req, res) {
   try {
    const notes = await Note.find()
    res.status(200).json(notes)
   } catch (error) {
    console.error(error);
    res.status(500).json({message:"Internal Server Error"})
   }
}

async function CreateNotes(req, res) {
   try{
    const {title,content} = req.body
    const note = new Note({title,content})
    const savedNote = await note.save()
    res.status(201).json({savedNote})
    console.log(title,content);
   } catch(error){
        res.status(500).json({message:"Internal server error"})
   }
}

async function updateNote(req, res) {
   try{
    const {title,content} = req.body
    const updateNote = await Note.findByIdAndUpdate(req.params.id,{title,content})
    if(!updateNote){
        return res.status(404).json({message:"Note not Found"})
    }
    res.status(200).json({message:"Updated Successfully"})
   }catch(error){
    console.error(error).json("Internal server error")
   }
}

async function deleteNode(req, res) {
    try{
       const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote){
            res.status(404).json({message:"Not Found"})
        }
        res.status(200).json({message:"Deleted Successfu;;y"})
    }
    catch(error){
        res.status(500).json({message:"Intenal Server Error"})
    }
}

async function getAllNotesById(req,res){
    try{
        const getAllNotesById = await Note.findById(req.params.id)
        if(!getAllNotesById){
           return res.status(404).json({message:"Not Found"})
        }
        res.status(200).json(getAllNotesById)
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = { getAllNotes, CreateNotes, updateNote, deleteNode,getAllNotesById };
