const express = require('express')
const router = express.Router()
const {getApps, saveApp, addNode, findLastNode, findNode, addKey } = require('../middleware/dbController')
const checkManifestUpdate = require('../middleware/checkupdate')
router.get('/app', getApps, (req,res)=>{
  res.json(res.locals.response)
})

router.put('/app',(req, res, next)=>{
  res.locals.names = [{name: 'this', uid: '1'},{name: 'was', uid: '2'},{name: 'test', uid: '3'}]
  return next()
}, saveApp, (req,res)=>{
  res.json(res.locals)
})

router.put('/node',(req,res,next)=>{
  res.locals = {uid: '1', manifest: '3'}
  return next()
}, addNode, (req,res)=> {
  res.json('send')
})

router.put('/nodeinit', (req,res,next)=>{
  res.locals = {uid: '1'}
  return next()
},findLastNode, (req,res) =>{
  res.json(res.locals.response)
})

router.put('/findNode', (req,res,next)=>{
  res.locals = {_id: "63e515c99286869578eebf47" }
  return next()
},findNode, (req,res) =>{
  res.json(res.locals.response)
})

router.post('/addToken', addKey, (req,res,next)=>{
  return res.status(200).json('success')
})

router.delete('/removeToken', (req,res,next)=>{

})

router.get('/test', async (req,res)=> {

  const checkupdate = await new checkManifestUpdate(
    {name: "this",
     uid: "1",
     head: "63e515c37faf6762289427de",
     tail: "63e5238b68a5069ca0c08e2a"},"https://localhost:8080", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJqYXNvbjphcGlLZXkiLCJuYmYiOjE2NzU3OTU2NzYsImlhdCI6MTY3NTc5NTY3NiwianRpIjoiZDg1M2QwYzgtNDI1MC00NGRlLTlhOTQtYjI1NjZmY2UxOGI5In0.ZH83uroRxmuckUA1oX5vjeubYm9JN-TEli_qKcBxJc0")
     checkupdate.update()
     res.json(checkupdate.revision)
})
module.exports = router