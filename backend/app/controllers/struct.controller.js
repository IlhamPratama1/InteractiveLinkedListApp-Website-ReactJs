const db = require('../models');
const Struct = db.structs;
const List = db.structs;

exports.getAll = async (req, res) => {
    try {
        const structs = await Struct.findAll();
        return res.status(200).send(structs);
    } catch (err) {
        return res.status(400).send({ 'message': `error get struct data: ${err}` });
    }
}

exports.getByListId = async (req, res) => {
    try {
        const struct = await Struct.findOne({ 
            where: {
                listId: req.params.id
            }
        });
        if (!struct)
            return res.status(400).send({ 'message': `struct not found` });
        return res.status(200).send(struct);
    } catch (err) {
        return res.status(400).send({ 'message': `error get struct data: ${err}` });
    }
}

exports.createStruct = async (req, res) => {
    try {
        const struct = await Struct.create({
            name: req.body.name,
            data: req.body.data,
            listId: req.body.listId
        });
        return res.status(200).send({
            'message': "create struct success",
            'data': struct
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error creating struct: ${err}`});
    }
}

exports.deleteById = async (req, res) => {
    try {
        await Struct.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send({ 'message': `struct deleted` });
    } catch (err) {
        return res.status(400).send({ 'message': `error delete struct: ${err}`});
    }
}