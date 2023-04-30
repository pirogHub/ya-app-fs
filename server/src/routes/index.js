const express = require('express')

const router = express.Router({ mergeParams: true })


router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/offer', require('./offer.routes'))
router.use('/img', require('./img.routes'), require('./imgRandom.routes'))
// router.use('/random', require('./random.routes'))
router.use('/dataStructs', require('./dataStructs.routes'))

module.exports = router