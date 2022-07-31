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
  check('content')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 500 })
    .withMessage('Please provide content with 1 to 500 characters.'),
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


// READ
// Get a User's specific Note   (NOT TESTED)
router.get('/:id', asyncHandler( async(req, res) => {
  const id = req.params.id;
  const note = await db.Note.findByPk({
    where: { id: id }
  });
  return res.json( note )
}));


//CREATE
//Create new Note as User (user.id = note.userId)
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
router.use((req, res, next) => {
  console.log('req.body====================',req.body)
  next()
})
router.put('/:id', validateNote, asyncHandler( async (req, res) => {
  const { id, userId, noteBowlId, title, content } = req.body
  const note = await db.Note.findByPk(req.params.id)
  if (note) {
    note.id = id,
    note.userId = userId
    note.noteBowlId = noteBowlId;
    note.title = title;
    note.content = content;
    await note.save();
  }
  const notes = await db.Note.findAll({
    where: { userId: userId, noteBowlId: noteBowlId },
    order: [['updatedAt', 'DESC']]
  })
  res.json( notes );
}));


// //DELETE
// //User deletes existing Note (user.id = note.userId)
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