module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("logs", {
        data: {
            type: Sequelize.JSON,
            allowNull: true
        }
    });

    return Log;
}