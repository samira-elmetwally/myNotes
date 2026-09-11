const express=require('express');
const router=express.Router();
const {getAllNotes,addNewNote,editOldNote,deleteNote}=require('../controllers/note.controller')



router.route('/:id').patch(editOldNote).delete(deleteNote);
router.route('/').get(getAllNotes).post(addNewNote);




module.exports=router