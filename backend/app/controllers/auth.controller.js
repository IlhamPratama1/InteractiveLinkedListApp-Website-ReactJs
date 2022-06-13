const config = require('../config/auth.config');
const db = require('../models/index');
const Role = db.roles;
const User = db.users;
const Quest = db.quests;
const UserQuest = db.userQuests;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.myUserDetail = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId
      },
      include: [
        { model: db.lists }, { model: db.userQuests }
      ],
      attributes: {
        exclude: ['password']
      }
    });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send({ 'message': `${err}` });
  }
}

exports.signup = async ( req, res ) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    });
    if (req.body.roles) {
      const roles = await Role.findAll({ 
        where: {
          name: {
            [Op.or]: req.body.roles 
          }
        }
      });
      await user.setRoles(roles);
    } else {
      await user.setRoles([2]);
    }
    const quests = await Quest.findAll();
    for (let i = 0; i < quests.length; i++) {
      await UserQuest.create({
        userId: user.id,
        questId: quests[i].id,
        isComplete: false
      });
    };
    return res.status(200).send({ 'message': `register user success ${quests.length}` });
  } catch (err) {
    return res.status(400).send({ 'message': `${err}`})
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) { throw new Error("User Not found"); }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      throw new Error("Invalid Password");
    }
    const token = jwt.sign({ id: user.id }, config.secret);  
    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (err) {
    return res.status(400).send({ 'message': `${err}` });
  }
};