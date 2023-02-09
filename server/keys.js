require('dotenv').config({path: './.env'})

module.exports = {
  MongoUser: process.env.DBUSER,
  MongoPassword: process.env.DBPASSWORD,
  GithubId: process.env.GITHUB_ID,
  GithubSecret: process.env.GITHUB_SECRET
}