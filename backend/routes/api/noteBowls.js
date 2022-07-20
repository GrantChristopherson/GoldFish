//---------External Modules------------
const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

//----------Internal Modules------------
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const db = require('../../db/models')



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


// Get All NoteBowls linked (users.id = noteBowls.userId)
// READ
router.get('/:userId', asyncHandler( async (req, res) => {
  const userId = req.params.userId;
  const noteBowls = await db.NoteBowl.findAll({
    where: { userId: userId },
    order: [['updatedAt', "DESC"]]
  })
  return res.json( noteBowls )
}))


// Get All Notes linked to a NoteBowl (noteBowls.id = notes.noteBowlId)
// READ
router.get('/:noteBowlId/notes', asyncHandler( async (req, res) => {
  const noteBowlId = req.params.noteBowlId;
  const notes = await db.Note.findAll({
    where: { noteBowlId: noteBowlId },
    order: [['updatedAt', "DESC"]]
  })
  return res.json( notes )
}))


//Create new NoteBowl linked (user.id = noteBowls.userId) NOT TESTED YET!
//CREATE
router.post('/:userId', validateNoteBowl, asyncHandler( async (req, res) => {
  const userId = req.params.userId;
  const { title } = req.body;
  const noteBowl = await db.NoteBowl.create({ userId, title });
  res.json( noteBowl );
}));



// //Update existing NoteBowl linked (user.id = noteBowls.userId) NOT TESTED YET!
// //UPDATE
// router.put('/:id', asyncHandler( async (req, res) => {
//   const id = await db.NoteBowl.update(req.body);
//   return res.redirect(`${req.baseUrl}/${id}`);
// }));



// //Delete existing NoteBowl linked (user.id => noteBowls.userId) NOT TESTED YET!
// //DELETE
// router.delete('/:id(\\d+)', asyncHandler( async (req, res) => {
//   const noteBowl = await db.NoteBowl.findByPk(req.params.id);
//   if (noteBowl) {
//     await noteBowl.destroy();
//     res.json({ message: 'Successfully deleted' });
//   } else {
//     res.json({ message: 'Failed to delete' });
//   };
// }));



module.exports = router;