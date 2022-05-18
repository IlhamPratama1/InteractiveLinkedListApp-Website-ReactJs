const config = require('../config/auth.config');
const db = require('../models/index');
const Role = db.roles;
const User = db.users;
const Quest = db.quests;
const UserQuest = db.userQuests;
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


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
    return res.status(400).send({ 'message': `error get user: ${err}` });
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
    return res.status(400).send({ 'message': `error register user:${err}`})
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) { return res.status(404).send({ message: "User Not found." }); }
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var token = jwt.sign({ id: user.id }, config.secret);  
    var authorities = [];
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
    return res.status(400).send({ 'message': `login failed:${err}` });
  }
};