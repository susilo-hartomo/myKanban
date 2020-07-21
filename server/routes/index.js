const router = require('express').Router();

// require routs
const userRout  = require('./user').router;
const kanbanRout  = require('./kanban').router;

router.get('/', (req, res) => {
    res.send('Home page')
})

router.use('/user', userRout)
router.use('/kanban', kanbanRout)

module.exports = {
    router
};
