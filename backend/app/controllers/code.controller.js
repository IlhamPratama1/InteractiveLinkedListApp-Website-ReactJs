const db = require('../models');
const axios = require("axios").default;
const Code = db.codes;

exports.getByListId = async (req, res) => {
    try {
        const code = await Code.findOne({ 
            where: {
                listId: req.params.id
            },
            include: [
                { model: db.logs }, { model: db.operations }, { model: db.searchLogs }
            ]
        });
        if (!code)
            return res.status(400).send({ 'message': `code not found` });
        return res.status(200).send(code);
    } catch (err) {
        return res.status(400).send({ 'message': `error get code data: ${err}` });
    }
}

exports.createCode = async (req, res) => {
    try {
        const code = await Code.create({
            data: req.body.data,
            listId: req.body.listId
        });
        return res.status(200).send({
            'message': "create code success",
            'data': code
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error creating code: ${err}`});
    }
}

exports.updateByListId = async (req, res) => {
    try {
        const code = await Code.findOne({ 
            where: {
                listId: req.body.listId
            }
        });
        if(!code)
            return res.status(400).send({ 'message': `code not found` });
        await code.update({
            data: req.body.data
        });
        return res.status(200).send({
            'message': `code updated`,
            'data': code
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error creating code: ${err}`});
    }
}

exports.deleteById = async (req, res) => {
    try {
        await Code.destroy({
            where: {
                listId: req.params.id
            }
        });
        return res.status(200).send({ 'message': `code deleted` });
    } catch (err) {
        return res.status(400).send({ 'message': `error delete code: ${err}`});
    }
}

exports.compileCode = async (req, res) => {
    try {
        const response = await axios.post("https://api.jdoodle.com/v1/execute/", {
            clientId: '57b1254b6bd64b74f43b6d0fba331451',
            clientSecret: '5d5d2ade9beb326d441c7d6842b08739730a2296f445c73d59d6a653ab277402',
            script: req.body.code,
            language: 'cpp',
            versionIndex: 0
        }, {
            headers: {
                'Content-type': 'application/json',
                accept: 'application/json',
            }
        });
        return res.status(200).send({
            'message': "compile succes",
            "output": response.data.output
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error compile code: ${err}`});
    }
}