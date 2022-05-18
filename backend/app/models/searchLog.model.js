module.exports = (sequelize, Sequelize) => {
    const SearchLog = sequelize.define("searchLog", {
        data: {
            type: Sequelize.JSON,
            allowNull: true
        }
    });

    return SearchLog;
}