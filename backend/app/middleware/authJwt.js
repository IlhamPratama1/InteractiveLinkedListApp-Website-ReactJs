const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require user Role!"
      });
      return;
    });
  });
};

isGuest = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "guest") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Teacher!"
      });
    });
  });
};

isUserOrGuest = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }

        if (roles[i].name === "guest") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require user or guest Role!"
      });
    });
  });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
        
            res.status(403).send({
                message: "Require Admin Role!"
            });
        });
    });
}

const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser,
  isGuest: isGuest,
  isUserOrGuest: isUserOrGuest,
  isAdmin: isAdmin
};

module.exports = authJwt;