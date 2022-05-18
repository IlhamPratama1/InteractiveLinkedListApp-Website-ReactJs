const db = require("../models");
const List = db.lists;

exports.getMyList = async (req, res) => {
    try {
        const lists = await List.findAll({
            where: {
                userId: req.userId
            },
            include: [
                { model: db.structs }, { model: db.nodes }, { model: db.codes }
            ]
        });
        return res.status(200).send(lists);
    } catch (err) {
        return res.status(400).send({ 'message': `error get list project data: ${err}` });
    }
}

exports.listDetail = async (req, res) => {
    try {
        const list = await List.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { model: db.structs }, { model: db.nodes }, { model: db.codes }
            ]
        });
        if (!list)
            return res.status(400).send({ 'message': `list not found` });
        return res.status(200).send(list);
    } catch (err) {
        return res.status(400).send({ 'message': `error get list project data: ${err}` });
    }
}

exports.createNewList = async (req, res) => {
    try {
        const list = await List.create({
            type: req.body.type,
            userId: req.userId
        });
        return res.status(200).send({
            'message': "create list success",
            'data': list
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error creating list: ${err}`});
    }
}

exports.deleteById = async (req, res) => {
    try {
        await List.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send({ 'message': `struct deleted` });
    } catch (err) {
        return res.status(400).send({ 'message': `error delete struct: ${err}`});
    }
}