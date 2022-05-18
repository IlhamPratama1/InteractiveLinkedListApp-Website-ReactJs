module.exports = (sequelize, Sequelize) => {
    const Quest = sequelize.define("quests", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        detail: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tool: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Quest;
}