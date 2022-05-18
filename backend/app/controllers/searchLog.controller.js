const db = require('../models');
const SearchLog = db.searchLogs;

exports.getByCodeId = async (req, res) => {
    try {
        const searchLog = await SearchLog.findOne({
            where: {
                codeId: req.params.id
            }
        });
        if (!searchLog)
            return res.status(400).send({ 'message': `searchLog not found` });
        return res.status(200).send(searchLog);
    } catch (err) {
        return res.status(400).send({ 'message': `error get searchLog data: ${err} `});
    }
}

exports.createSearchLog = async (req, res) => {
    try {
        const searchLog = await SearchLog.create({
            data: req.body.data,
            codeId: req.body.codeId
        });
        return res.status(200).send({
            'message': "create searchLog succes",
            'data': searchLog
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error creating searchLog: ${err}` });
    }
}

exports.updateByCodeId = async (req, res) => {
    try {
        const searchLog = await SearchLog.findOne({
            where: {
                codeId: req.body.codeId
            }
        });
        if(!searchLog)
            return res.status(400).send({ 'message': `searchLog not found` });
        await searchLog.update({
            data: req.body.data
        });
        return res.status(200).send({
            'message': 'searchLog updated',
            'data': searchLog
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error updating searchLog: ${err}` });
    }
}