const { request } = require("express");
const express=require("express");
const { authenticate } = require("../middlewares/authentication.middleware");
const {NoteModel}=require("../models/notes.model")
const notesRouter=express.Router()


notesRouter.use(authenticate);

notesRouter.get("/", async (req,res)=>{
  let data = await NoteModel.find();
  res.json(data);
})



notesRouter.post("/create", async (req,res)=>{
const payload=req.body
try {
  const new_note=new NoteModel(payload)
await new_note.save()
res.send({"msg":"Note Created"})
} catch (err) {
  res.send({"msg":err.message})
}
})


notesRouter.patch("/update/:noteID", async (req,res)=>{
let id = req.params.noteID;
 const note = await NoteModel.findById(id);
//  console.log(note);
const note_userID = note.userID;
const userID = req.body.userID;
try {
  if(userID === note_userID){
    await NoteModel.findByIdAndUpdate(id,req.body);
    res.send("note updated successfully");

  }else{
    res.send("You are not authorized to update this note");
  }
  
} catch (err) {
  res.send({"msg":err.message})
}
})

notesRouter.delete("/delete/:noteID", async(req,res)=>{
  //logic to delete the notes
  let id = req.params.noteID;
  const note = await NoteModel.findById(id);
  //  console.log(note);
  const note_userID = note.userID;
  const userID = req.body.userID;
  try {
    if(userID === note_userID) {
      await NoteModel.findByIdAndDelete(id);
      res.send("note deleted successfully");
    }else{
      res.send("you are not authorized to delete this note")
    }

  } catch (err) {
  res.send({"msg":err.message})
  
}
})



module.exports={
notesRouter
}
