const db = require('../models');
const Operation = db.operations;

exports.getByCodeId = async (req, res) => {
    try {
        const operation = await Operation.findOne({ 
            where: {
                codeId: req.params.id
            }
        });
        if (!operation)
            return res.status(400).send({ 'message': `operation not found` });
        return res.status(200).send(operation);
    } catch (err) {
        return res.status(400).send({ 'message': `error get operation data: ${err}` });
    }
}

exports.createOperation = async (req, res) => {
    try {
        const operation = await Operation.create({
            data: req.body.data,
            codeId: req.body.codeId
        });
        return res.status(200).send({
            'message': "create operation success",
            'data': operation
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error creating operation: ${err}`});
    }
}

exports.updateByCodeId = async (req, res) => {
    try {
        const operation = await Operation.findOne({ 
            where: {
                codeId: req.body.codeId
            }
        });
        if(!operation)
            return res.status(400).send({ 'message': `operation not found` });
        await operation.update({
            data: req.body.data
        });
        return res.status(200).send({
            'message': `code updated`,
            'data': operation
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error updating operation: ${err}`});
    }
}