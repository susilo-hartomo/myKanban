const router = require('express').Router();
const { KanbanController } = require('../controllers/kanbanCont');
const { Auth } = require('../middlewares/auth');

// router.get('/', (req, res) => {
//     res.send('kanban router')
// })

router.use(Auth.authentication) // Proses verify access token user login memjadi { id dan email}
router.get('/', KanbanController.findAll)
router.post('/', KanbanController.create)

//authorization Prose verify data yang di akses adalah milik nya sendiri
router.get('/:id', Auth.authorization, KanbanController.findByPk)
router.put('/:id', Auth.authorization, KanbanController.update)
router.delete('/:id', Auth.authorization, KanbanController.delete)

module.exports = {
    router
};
