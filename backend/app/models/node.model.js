module.exports = (sequelize, Sequelize) => {
    const Node = sequelize.define("nodes", {
        data: {
            type: Sequelize.JSON,
            allowNull: true
        }
    });

    return Node;
}