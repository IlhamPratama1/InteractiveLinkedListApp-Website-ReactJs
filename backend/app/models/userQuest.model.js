module.exports = (sequelize, Sequelize) => {
    const UserQuest = sequelize.define("user_quests", {
        isComplete: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return UserQuest;
}