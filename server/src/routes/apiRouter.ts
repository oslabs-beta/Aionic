import express, {Request, Response} from 'express'
import * as userController from '../controllers/userController'
import * as dbController from '../controllers/dbController'
import * as authController from '../controllers/authController'
import * as argoController from '../controllers/argoController'
const router = express.Router()


/**************** usergitToken route ***************/
router.get('/gitToken', userController.checkUserGitToken, (req:Request,res: Response)=> {
  return res.json(res.locals.gitToken)
})
// /api/usergithubtoken post route has changed to gitToken post 
router.post('/gitToken', userController.patchUserGitToken, (req:Request, res:Response)=> {
  return res.json(res.locals.response)
})

/**************** userargoToken route ***************/
router.get('/userApiKey', userController.getUserToken, (req:Request,res:Response)=> {
  return res.json(res.locals)
})

router.post('/userApiKey', userController.addUserApiKey, (req: Request, res: Response) => {
  return res.json(res.locals)
})

/**************** globalApiKey route ***************/
// req.body ={
//   api_key
//   url
// }
// this as global apiKey for autoupdate functionality
//make the global apiKey routes admin only in the future
router.post('/globalKey', dbController.addGlobalApiKey, (req: Request, res: Response) =>{
  return res.json('successfully added')
})

router.get('/globalKey', dbController.getGlobalApiKey, (req: Request, res: Response) => {
  return res.json(res.locals.argoToken)
})

/**************** check user auth route ***************/
router.get('/checkUser', authController.isLoggedIn, (req: Request, res: Response) => {
  return res.json(req.user)
})

/**************** grab user apps route ***************/
router.get('/apps', userController.getUserToken, argoController.getAllUserApps, (req: Request, res: Response) => {
  return res.json(res.locals.apps)
})

/**************** grab manifests for app route ***************/

// [
//   {
//     _id: 'object_id:asdasdasdasd',
//     manifest: {type: String, required: true}, //stringify
//     revision: {type: String, required: true},
//     prev: {type: String, default: null},
//     next: {type: String, default: null}
//   }
// ]
// this gets the first five of the manifests
router.get('/manifests', dbController.getManifests, (req: Request, res: Response) => {
  return res.json(res.locals.manifests)
})

// [
//   {
//     _id: 'object_id:asdasdasdasd',
//     manifest: {type: String, required: true}, //stringify
//     revision: {type: String, required: true},
//     prev: {type: String, default: null},
//     next: {type: String, default: null}
//   }
// ]
// this gets the next five of the manifests
router.get('/nextManifests', dbController.getNextManifests, (req: Request, res: Response)=>{
  return res.json(res.locals.manifests)
})

export default router