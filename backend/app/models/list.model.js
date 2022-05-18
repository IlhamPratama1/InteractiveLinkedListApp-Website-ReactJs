module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("lists", {
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return List;
}