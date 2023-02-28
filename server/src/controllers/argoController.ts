import { Request, Response, NextFunction } from 'express';
import { App } from '../config/MongoDb'
import * as T from '../types';

//Grabs all user apps to display for user************************************************************************************************
//grabs all apps user has access to
export const getAllUserApps = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      console.log("getAllUserApps")
      let appList: T.AppList[] = [];
      for (let i = 0; i < res.locals.argoTokens.length; i++) {
        let data: any = await fetch(`${res.locals.argoTokens[i].url}/api/v1/applications`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${res.locals.argoTokens[i].api_key}`,
          }
        })
        data = await data.json()
        appList = appList.concat(data.items);

      }
      console.log(appList)
      res.locals.apps = appList.map(app => {
        const apps = {} as T.App;
        apps.name = app.metadata.name;
        apps.uid = app.metadata.uid;
        apps.source = app.spec.source
        return apps;
      })
      console.log(res.locals.apps)
      return next();
    }
    catch (err) {
      console.log(err)
      return next({
        log: 'Error while invoking middleware: getAllUserApps',
        status: 400,
        message: `Error getAllUserApps: ${err}`,
      });
    }
  }

//AutoUpdate functions*********************************************************************************************************
//queries argoCD for all application clusters running
export const updateApp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    let data: any = await fetch(`${res.locals.argoToken.url}/api/v1/applications`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${res.locals.argoToken.api_key}`,
      }
    })
    data = await data.json()
    
    if (req === undefined) return data.items
    res.locals.apps = data.items;
    return next();
  }
  catch (err) {
    return next({
      log: 'Error while invoking middleware: updateApp',
      status: 400,
      message: `Error updateApp `,
    })
  }
}

//detects all new application clusters and adds them to the database
export const updateAppDatabase = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const appList = [];
    for (let i = 0; i < res.locals.apps.length; i++) {
      const { name, uid } = res.locals.apps[i].metadata;
      let data: T.App[] = await App.find({ name, uid });
      if (data.length < 1) {
        await App.create({ name, uid });
        appList.push({ name, uid });
      }
    }
    if (req === undefined) return appList;
    res.locals.appList = appList;
    return next();
  }
  catch (err) {
    return next({
      log: 'Error while invoking middleware: updateAppDatabase',
      status: 400,
      message: `Error updateAppDatabase: ${err}`,
    })
  }
}