require('dotenv').config({path: './.env'})

module.exports = {
  MongoUser: process.env.DBUSER,
  MongoPassword: process.env.DBPASSWORD
}