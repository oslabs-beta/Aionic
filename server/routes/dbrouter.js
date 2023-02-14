const express = require('express')
const router = express.Router()
const {getApps, saveApp, addNode, findLastNode, findNode, addKey } = require('../middleware/dbController')
const checkManifestUpdate = require('../middleware/checkupdate')



router.post('/addToken', addKey, (req,res,next)=>{
  return res.status(200).json('success')
})

router.delete('/removeToken', (req,res,next)=>{

})

router.get('/test', (req,res)=> {

  const checkupdate = new checkManifestUpdate(
    {
      "_id": {
        "$oid": "63ebac24079a2eb5416510fa"
      },
      "name": "guest-book",
      "uid": "9f2f0577-f717-4093-9bb4-1b99e71ca38a",
      "head": "63ebac24079a2eb541651109",
      "tail": "63ebb63effd4abbb4a0d0def",
      "__v": 0
    },"https://localhost:1995", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJ0aW1vdGh5OmFwaUtleSIsIm5iZiI6MTY3NjMzNjM2OSwiaWF0IjoxNjc2MzM2MzY5LCJqdGkiOiJhOGQwNzcxZS1iODI1LTQxNGEtYmIxNy00NmMzMmE4YjBlZjAifQ.T3oDgneym5L-HeShVgoh4aWlVrHwj3GYj2hXhUS3IZ8")
    checkupdate.update()
     res.json(checkupdate.revision)
})
module.exports = router