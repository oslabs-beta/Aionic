import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config({path: path.resolve(__dirname,'../.env')})

interface env {
  MongoUser:string,
  MongoPassword: string,
  GithubId: string,
  GithubSecret: string
}

const keys:env = {
  MongoUser: process.env.DBUSER,
  MongoPassword: process.env.DBPASSWORD,
  GithubId: process.env.GITHUB_ID,
  GithubSecret: process.env.GITHUB_SECRET
}

export default keys