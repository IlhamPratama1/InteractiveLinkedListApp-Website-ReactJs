module.exports = (sequelize, Sequelize) => {
    const Operation = sequelize.define("operations", {
        data: {
            type: Sequelize.JSON,
            allowNull: true
        }
    });

    return Operation;
}