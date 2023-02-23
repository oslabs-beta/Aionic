import {User} from '../config/MongoDb'
import { Request, Response, NextFunction } from 'express';
import * as T from "../types"
//User Git Token************************************************************************************************

export const checkUserGitToken = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    const { user } = req;
    let data: T.User = await User.findOne({ githubId: user })
    const { githubId, githubToken } = data;
    if (githubToken === '') {
        return res.status(200).json({ githubToken: 'no token'})
    }
    else {
        res.locals.gitToken = { githubId, githubToken }
        return next();
    }
}

export const patchUserGitToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const {githubId, githubToken} = req.body
      await User.updateOne({githubId: githubId}, {githubToken: githubToken});
      res.locals.response = 'successfully saved';
      return next()
    }catch(err) {
      console.log("this is the fucntion error ",err);
      const error = {
        log: `server/middlewarte/dbcontroller error`,
        status: 500,
        message:'server side error check serverlog'
      };
      return next(error)
    };
}

//************************************************************************************************************** 

//User Argo Token************************************************************************************************

export const getUserToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { user } = req.query;
      let data: T.User = await User.findOne({ githubId: user });
      if (data.argo_tokens.length < 1) {
        return res.status(400).json({
          api_key: false,
          url: false,
        });
      }
      else {
        res.locals.argoTokens = data.argo_tokens
        return next();
      }
    }
    catch (err) {
      return next({
        log: 'Error while invoking middleware: getUserToken',
        status: 400,
        message: `Error getUserToken: ${err}`,
      });
    }
}

export const addUserApiKey = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const {api_key, url, githubId} = req.body
      const user = await User.updateOne({githubId: githubId, 'argo_tokens.api_key': {$ne: api_key}}, {$push: {argo_tokens: {api_key: api_key, url:url}}});
      res.locals.response = 'successfully saved';
      return next()
    } catch(err) {
      console.log("this is the fucntion error ",err);
      const error = {
        log: `server/middlewarte/dbcontroller error`,
        status: 500,
        message:'server side error check serverlog'
      };
      return next(error)
    };
}

//************************************************************************************************************** 