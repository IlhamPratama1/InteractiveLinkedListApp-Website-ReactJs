const qs = require('qs');
const config = require('../config/auth.config');
const db = require('../models/index');
const User = db.users;
const Quest = db.quests;
const UserQuest = db.userQuests;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios').default;

async function getGoogleOAuthTokens({ code }) {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: config.google_client_id,
        client_secret: config.google_client_secret,
        redirect_uri: config.google_redirect_url,
        grant_type: "authorization_code",
    };

    try {
        const res = await axios.post(
            url,
            qs.stringify(values),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return res.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getGoogleUser({ id_token, access_token }) {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

exports.googleOAuthHandler = async (req, res) => {
    const code = req.query.code;
    try {
        const { id_token, access_token } = await getGoogleOAuthTokens({ code });
        const googleUser = await getGoogleUser({ id_token, access_token });

        let user = await User.findOne({ where: { email: googleUser.email } });
        if (!user) {
            user = await User.create({
                username: googleUser.name,
                email: googleUser.email,
                password: bcrypt.hashSync(googleUser.id, 10)
            });
            await user.setRoles([2]);
            const quests = await Quest.findAll();
            for (let i = 0; i < quests.length; i++) {
                await UserQuest.create({
                    userId: user.id,
                    questId: quests[i].id,
                    isComplete: false
                });
            };
        }
        const token = jwt.sign({ id: user.id }, config.secret);
        let authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        const qs = new URLSearchParams({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
        res.redirect(`${config.client_url}google/oauth?${qs}`);
        
    } catch (error) {
        throw new Error(error.message);
    }
}