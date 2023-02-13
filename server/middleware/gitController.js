const { User } = require('../config/MongoDb')
const gitContoller = {};

gitController.checkToken = async (req, res, next) => {
    const { user } = req;
    let data = User.findOne({ githubId: user })
    const { githubId, githubToken } = data;
    if (githubToken !== '') {
        return res.status(200).json({ githubToken: 'no token'})
    }
    else {
        res.locals.gitToken = { githubId, githubToken }
        return next();
    }
}

module.exports = gitContoller;