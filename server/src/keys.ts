import path from 'path'
import * as dotenv from 'dotenv'
import fs from 'fs'
dotenv.config({path: path.resolve(__dirname,'../.env')})

// const jsonData:any = JSON.parse(
//   await fs.readFile(
//     path.resolve(__dirname, './config/AppConfig.json')
//   )
// )
const data:Buffer = fs.readFileSync(path.resolve(__dirname, '../AppConfig.json'));
const parsedData:any = JSON.parse(data.toString());


export const config = parsedData;

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

export default keys;