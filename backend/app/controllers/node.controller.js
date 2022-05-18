const db = require('../models');
const Node = db.nodes;

exports.getByListId = async (req, res) => {
    try {
        const node = await Node.findOne({ 
            where: {
                listId: req.params.id
            }
        });
        if (!node)
            return res.status(400).send({ 'message': `node not found` });
        return res.status(200).send(node);
    } catch (err) {
        return res.status(400).send({ 'message': `error get node data: ${err}` });
    }
}

exports.createNode = async (req, res) => {
    try {
        const node = await Node.create({
            data: req.body.data,
            listId: req.body.listId
        });
        return res.status(200).send({
            'message': "create node success",
            'data': node
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error creating node: ${err}`});
    }
}

exports.updateByListId = async (req, res) => {
    try {
        const node = await Node.findOne({ 
            where: {
                listId: req.body.listId
            }
        });
        if (!node)
            return res.status(400).send({ 'message': `node not found` });
        await node.update({
            data: req.body.data
        });
        return res.status(200).send({
            'message': `node updated`,
            'data': node
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error updating node: ${err}`});
    }
}

exports.deleteById = async (req, res) => {
    try {
        await Node.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send({ 'message': `node deleted` });
    } catch (err) {
        return res.status(400).send({ 'message': `error delete node: ${err}`});
    }
}