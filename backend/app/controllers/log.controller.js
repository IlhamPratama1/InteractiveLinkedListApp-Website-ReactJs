const db = require('../models');
const Log = db.logs;

exports.getAll = async (req, res) => {
    try {
        const logs = await Log.findAll();
        if (!logs)
            return res.status(400).send({ 'message': `logs not found` });
        return res.status(200).send(logs);
    } catch (err) {
        return res.status(400).send({ 'message': `error get log data: ${err}` });
    }
}

exports.getByCodeId = async (req, res) => {
    try {
        const logs = await Log.findOne({ 
            where: {
                codeId: req.params.id
            }
        });
        if (!logs)
            return res.status(400).send({ 'message': `logs not found` });
        return res.status(200).send(logs);
    } catch (err) {
        return res.status(400).send({ 'message': `error get log data: ${err}` });
    }
}

exports.createLog = async (req, res) => {
    try {
        const log = await Log.create({
            data: req.body.data,
            codeId: req.body.codeId
        });
        return res.status(200).send({
            'message': "create log success",
            'data': log
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error creating log: ${err}`});
    }
}

exports.updateByCodeId = async (req, res) => {
    try {
        const log = await Log.findOne({ 
            where: {
                codeId: req.body.codeId
            }
        });
        if(!log)
            return res.status(400).send({ 'message': `log not found` });
        await log.update({
            data: req.body.data
        });
        return res.status(200).send({
            'message': `log updated`,
            'data': log
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error updating log: ${err}`});
    }
}