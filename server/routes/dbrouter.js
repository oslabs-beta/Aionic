const express = require('express')
const router = express.Router()
const {getApps, saveApp, addNode, findLastNode, findNode } = require('../middleware/dbController')

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

module.exports = router