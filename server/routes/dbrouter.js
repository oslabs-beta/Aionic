const express = require('express')
const router = express.Router()
const {getApps, saveApp, addNode, findLastNode, findNode, addKey } = require('../middleware/dbController')




router.post('/addToken', addKey, (req,res,next)=>{
  return res.status(200).json('success')
})

router.delete('/removeToken', (req,res,next)=>{

})

module.exports = router