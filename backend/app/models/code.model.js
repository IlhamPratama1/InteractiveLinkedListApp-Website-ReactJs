module.exports = (sequelize, Sequelize) => {
    const Code = sequelize.define("codes", {
        data: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });

    return Code;
}