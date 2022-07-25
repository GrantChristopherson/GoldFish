//---------External Modules------------
const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

//----------Internal Modules------------
const { handleValidationErrors } = require('../../utils/validation');
const db = require('../../db/models')


//---------------------------------------

const router = express.Router();


//------------NoteBowl Validator---------

const validateNoteBowl = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage('Please provide a title with at least 1 character, but no more than 30.'),
  handleValidationErrors
]



//------------API Routes------------------

// READ
// Get All NoteBowls linked to User (users.id = noteBowls.userId)
router.get('/:userId', asyncHandler( async (req, res) => {
  const userId = req.params.userId;
  const noteBowls = await db.NoteBowl.findAll({
    where: { userId: userId },
    order: [['updatedAt', 'DESC']]
  })
  return res.json( noteBowls )
}))


// READ
// Get All Notes linked to specific NoteBowl (noteBowls.id = notes.noteBowlId)
router.get('/:noteBowlId/notes', asyncHandler( async (req, res) => {
  const noteBowlId = req.params.noteBowlId;
  const notes = await db.Note.findAll({
    where: { noteBowlId: noteBowlId },
    order: [['updatedAt', "DESC"]]
  })
  return res.json( notes )
}))


//CREATE
//Create new NoteBowl as User (user.id = noteBowls.userId) NOT TESTED YET!
router.post('/:id', validateNoteBowl, asyncHandler( async (req, res) => {
  const userId = req.params.userId;
  const { title } = req.body;
  const noteBowl = await db.NoteBowl.create({ userId, title });
  res.json( noteBowl );
}));


// //UPDATE
// //User updates existing NoteBowl (changes title of noteBowl) (user.id = noteBowls.userId) NOT TESTED YET!
router.put('/:id', validateNoteBowl, asyncHandler( async (req, res) => {
  const { title } = req.body
  const noteBowl = await db.NoteBowl.findByPk(req.params.id)
  if (noteBowl) {
    noteBowl.title = title;
    await noteBowl.save();
    res.json({ 
      message: 'Success', 
      noteBowl
    })
  } else {
    res.json({ message: 'Fail' })
  }
}));


// //DELETE
// //User deletes existing NoteBowl (user.id = noteBowls.userId) NOT TESTED YET!
router.delete('/:id', asyncHandler( async (req, res) => {
  const noteBowl = await db.NoteBowl.findByPk(req.params.id);
  if (noteBowl) {
    await noteBowl.destroy();
    res.json({ message: 'Successfully deleted' });
  } else {
    res.json({ message: 'Failed to delete' });
  };
}));



module.exports = router;