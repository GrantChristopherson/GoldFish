//---------External Modules------------
const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

//----------Internal Modules------------
const { handleValidationErrors } = require('../../utils/validation');
const db = require('../../db/models')


//---------------------------------------

const router = express.Router();


//------------Note Validator---------

const validateNote = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 50 })
    .withMessage('Please provide a title with 1 to 50 characters.'),
  handleValidationErrors
]


//------------API Routes--------------

// READ
// Get all User's Notes
router.get('/:userId', asyncHandler( async(req, res) => {
  const userId = req.params.userId;
  const notes = await db.Note.findAll({
    where: { userId: userId },
    order: [['updatedAt', 'DESC']]
  });
  return res.json( notes )
}));



//CREATE
//Create new Note as User (user.id = note.userId) NOT TESTED YET!
router.post('/:userId', validateNote, asyncHandler( async (req, res) => {
  const { userId, noteBowlId, title, content } = req.body;
  const note = await db.Note.create({ userId, noteBowlId, title, content });
  const notes = await db.Note.findAll({
    where: { userId: userId, noteBowlId: noteBowlId },
    order: [['updatedAt', 'DESC']]
  })
  res.json( notes );
}));


// //UPDATE
// //User updates existing Note (changes title of note, or content) (user.id = note.userId) NOT TESTED YET!
router.put('/:id', validateNote, asyncHandler( async (req, res) => {
  const { noteBowlId, title, content } = req.body
  const note = await db.Note.findByPk(req.params.id)
  if (note) {
    note.noteBowlId = noteBowlId;
    note.title = title;
    note.content = content;
    await note.save();
    res.json({ 
      message: 'Success', 
      note
    })
  } else {
    res.json({ message: 'Fail' })
  }
}));


// //DELETE
// //User deletes existing Note (user.id = note.userId) NOT TESTED YET!
router.delete('/:id', asyncHandler( async (req, res) => {
  const note = await db.Note.findByPk(req.params.id);
  if (note) {
    await note.destroy();
    res.json({ message: 'Successfully deleted note' });
  } else {
    res.json({ message: 'Failed to delete note' });
  };
}));



module.exports = router;