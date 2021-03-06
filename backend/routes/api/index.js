const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const noteBowlsRouter = require('./noteBowls.js')
const notesRouter = require('./notes.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notebowls', noteBowlsRouter);
router.use('/notes', notesRouter)

////---- POST /test used for testing restoreCSRF and other functionality
 
// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });


//testers below for middleware utils/auth.js

// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

//---tester above
module.exports = router;