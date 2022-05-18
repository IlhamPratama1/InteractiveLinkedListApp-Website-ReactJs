const db = require('../models');
const Quest = db.quests;
const UserQuest = db.userQuests;
const User = db.users;

exports.getAllQuest = async (req, res) => {
    try {
        const quests = await Quest.findAll();
        return res.status(200).send(quests)
    } catch (err) {
        return res.status(400).send({ 'message': `error get quests: ${err}` });
    }
}

exports.getMyQuest = async (req, res) => {
    try {
        const myQuests = await UserQuest.findAll({
            where: {
                userId: req.userId
            },
            include: [ Quest ]
        });
        return res.status(200).send(myQuests);
    } catch (err) {
        return res.status(400).send({ 'message': `error get quest data: ${err}` });
    }
}

exports.updateById = async (req, res) => {
    try {
        const userQuest = await UserQuest.findOne({
            where: {
                id: req.body.id
            }
        });
        if (!userQuest)
            return res.status(400).send({ 'message': 'quest not found' });
        await userQuest.update({
            isComplete: req.body.isComplete
        });
        return res.status(200).send({
            'message': 'user quest updated',
            'data': userQuest
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error update user quest: ${err}` });
    }
}

exports.createNewQuest = async (req, res) => {
    try {
        const quest = await Quest.create({
            name: req.body.name,
            detail: req.body.detail,
            tool: req.body.tool,
            type: req.body.type
        });
        const users = await User.findAll();
        for (let i = 0; i < users.length; i++) {
            await UserQuest.create({
                userId: users[i].id,
                questId: quest.id,
                isComplete: false
            });
        };
        return res.status(200).send({
            'message': "create quest success",
            'data': quest
        });
    } catch (err) {
        return res.status(400).send({ 'message': `error creating quest: ${err}` });
    }
}

exports.deleteById = async (req, res) => {
    try {
        await Quest.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send({ 'message': `quest deleted` });
    } catch (err) {
        return res.status(400).send({ 'message': `error delete quest: ${err}` });
    }
}