module.exports = (sequelize, Sequelize) => {
    const Struct = sequelize.define("structs", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        data: {
            type: Sequelize.JSON,
            allowNull: false
        }
    });

    return Struct;
}