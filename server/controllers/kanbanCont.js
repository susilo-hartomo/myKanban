const { Kanban, User } = require('../models');

class KanbanController {
    static findAll(req, res, next) {
        Kanban.findAll({
            order: [['id', 'ASC']],
            include: [User],
            // where: {
            //     UserId: req.userId
            // }
        })
            .then((data) => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    next({ name: 'DATA_NOT_FOUND' })
                }
            }).catch((err) => {
                next({ name: 'EROR_SERVER' })
            });
    }

    static create(req, res, next) {
        let newData = {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            due_date: req.body.due_date,
            task_priority: req.body.task_priority,
            UserId: req.userId
        }
        console.log('newData: ', newData);
        Kanban.create(newData)
            .then((data) => {
                console.log('data: ', data);
                res.status(201).json(data)
            }).catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    next({ name: 'EROR_VALIDATION' })
                } else {
                    next({ name: 'EROR_SERVER' })
                }
            });
    }

    static findByPk(req, res, next) {
        Kanban.findByPk(req.params.id)
            .then((data) => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    next({ name: 'DATA_NOT_FOUND' })
                }
            }).catch((err) => {
                next({ name: 'EROR_SERVER' })
            });
    }

    static update(req, res, next) {
        let newData = {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            due_date: req.body.due_date,
            task_priority: req.body.task_priority,
            UserId: req.userId
        }
        Kanban.update(newData, {
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                if (data == 1) {
                    res.status(200).json({ msg: 'Data successfully updated' })
                } else {
                    next({ name: 'DATA_NOT_FOUND' })
                }
            }).catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    next({ name: 'EROR_VALIDATION' })
                } else {
                    next({ name: 'EROR_SERVER' })
                }
            });
    }

    static delete(req, res, next) {
        Kanban.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                if (data == 1) {
                    res.status(200).json({ msg: 'Data successfully deleted' })
                } else {
                    next({ name: 'DATA_NOT_FOUND' })
                }
            }).catch((err) => {
                next({ name: 'EROR_SERVER' })
            });
    }
}

module.exports = {
    KanbanController
};
