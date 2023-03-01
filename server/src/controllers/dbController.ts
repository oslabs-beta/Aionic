import {User, App, Node, ApiKey} from '../config/MongoDb';
import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import * as T from '../types'

// Add Node to linked list of app********************************************************************************
// pass in the uid of the cluster you want to look at as res.locals.uid 
// res.locals =
// {
//   uid: String, fetched from db or api this is application's uid
//   manifest: (fetched from api and stringify it plz)
//   revision: {fetched from api}
// }
export const addNode = async (req: Request | undefined, res: Response | any, next?: NextFunction ): Promise<T.Node | void> => {
// create and save the node to the app
  try {
    const {uid, manifest,revision, sourceType} = res.locals
    const app:HydratedDocument<T.App> = await App.findOne({uid: uid})
    const node:HydratedDocument<T.Node> = await Node.create({manifest: manifest, revision:revision, sourceType: sourceType})
    if (app.head === null) {
      app.head = node._id
      app.tail = node._id
    } else {
      const prevNode:HydratedDocument<T.Node> = await Node.findOne({_id: app.tail});
      prevNode.next = node._id;
      node.prev = app.tail;
      app.tail = node._id;
      prevNode.save();
      node.save();
    }
    app.save()
    if (req === undefined) return node
    return next()
  } catch(err) {
    const error:T.error = {
      message: `server/middleware/dbController.js dbController.addNode ${typeof err === 'object'? JSON.stringify(err) : err }`,
      status:500,
      log:'data base error'
    }
    console.log(err)
    return next(error)
  }
}

//Adding admin API Key ************************************************************************************************
// pass in as res.locals
// {
//   api_key: ,
//   uid: ,
// }
//////////////////////////
export const addGlobalApiKey = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { api_key, url } = req.body
    const Api_Key:T.ApiKey = await ApiKey.create({ api_key, url })
    return next();
  }
  catch(err) {
    const error:T.error = {
      message: `server/middleware/dbController.js dbController.addKey ${typeof err === 'object'? JSON.stringify(err) : err }`,
      status:500,
      log:'data base error'
    }
    return next(error)
  }
}

  //finds all the admin api keys
  //passes in nothin
  // checking gloablapi key
  /////////////////////////
  export const getGlobalApiKey = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      let data:T.ApiKey[] = await ApiKey.find({});
      if (data.length < 1) {
        console.log('no token');
        if(!next) return undefined;
        return res.status(200).json({
          api_key: false,
          url: false,
        });
      }
      else {
        if(!next) return data;
        else {
          res.locals.argoToken = data;
          return next();
        }
      }
    }
    catch (err) {
      return next({
        log: 'Error while invoking middleware: dbController.checkToken',
        status: 400,
        message: `Error checkToken: ${err}`,
      });
    }
  }

//Manifest ************************************************************************************************
//grabs the first five most recent manifests for the requested application cluster
//client should pass down app uid in query parameter
/////////////////////
export const getManifests = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { uid } = req.query;
  try {
    let data:T.App = await App.findOne({ uid });
    const manifests:T.Node[] = [];
    let curr = data.tail;
    let i =0
    while (i < 5 && curr) {
      let manifestData:T.Node = await Node.findOne({ _id: curr });
      manifests.push(manifestData); 
      curr = manifestData.prev;
      i++
    }
    res.locals.manifests = manifests as T.Node[]
    return next();
  }
  catch (err){
    console.error(err)
    const error:T.error = {
      log: 'Error while invoking middleware: dbController/getManifests',
      status: 400,
      message: `Error getManifests: ${err}`,
    }
    return next(error);
  }
}

// get next 5 manifests
// data comes as req.query 
// {
//   _id: string
// }
//////////////////////
export const getNextManifests = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.query;
  try {
    let i = 0
    const manifests:T.Node[] = [];
    let cur = id;
    while (i< 5 && cur){
      const curNode:T.Node = await Node.findOne({_id:cur});
      manifests.push(curNode); 
      cur = curNode.prev;
      i+=1;
    }

    res.locals.manifests = manifests as T.Node[];
    return next();
  }
  catch (err){
    console.log(err)
    return next({
      log: 'Error while invoking middleware: getManifests',
      status: 400,
      message: `Error getManifests: ${err}`,
    });
  }
}