const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ToDoList = require('../models/toDoList');

router.get('/', (req, res, next) => {
    console.log('working')
    ToDoList.find()
        .select('_id title description')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                toDoList: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                    }
                })
            };
            console.log(response)
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(error);
            res.status(500).json({
                error: err
            })
        })
});

router.post('/', (req, res, next) => {
    console.log(req.body)
    const toDoList = new ToDoList({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
    });
    toDoList
        .save()
        .then(result => {
            // res.status(201).json({
            //     message: 'Created message successfully',
            //     createdtoDoList: {
            //         title: result.title,
            //         description: result.description,
            //         _id: result._id
            //     }
            // })
            res.redirect('/toDoList')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });});

router.delete('/:toDoListId', (req, res, next) => {
    const id = req.params.toDoListId;
    console.log(id)
    ToDoList.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});
module.exports = router;
