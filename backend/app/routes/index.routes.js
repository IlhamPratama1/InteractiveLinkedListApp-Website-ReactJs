const authRoute = require('./auth.routes');
const listRoute = require('./list.routes');
const structRoute = require('./struct.routes');
const nodeRoute = require('./node.routes');
const codeRoute = require('./code.routes');
const logRoute = require('./log.routes');
const operationRoute = require('./operation.routes');
const searchLogRoute = require('./searchLog.routes');
const questRoute = require('./quest.routes');

module.exports = (app) => {

    // Initalize Header
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Initialize Index Route
    app.get('/', (req, res) => { res.send({ message: "Welcome to Exam App server"}); });
    
    // #region Routes
    app.use('/api/auth', authRoute);
    app.use('/api/list', listRoute);
    app.use('/api/struct', structRoute);
    app.use('/api/node', nodeRoute);
    app.use('/api/code', codeRoute);
    app.use('/api/log', logRoute);
    app.use('/api/operation', operationRoute);
    app.use('/api/search-log', searchLogRoute);
    app.use('/api/quest', questRoute);
    // #endregion
    
}