const express = require('express');
const router = express.Router();
const authController = require('../middleware/authController');
const argoController = require('../middleware/argoController');

//endpoint for checking if user is authenticated
router.get('/checkUser', authController.isLoggedIn, (req, res) => {
  return res.json(req.user);
})

//endpoint for apps request
router.get('/apps', argoController.getApps, (req, res) => {
  return res.status(200).json(res.locals.apps)
});

//endpoint for manifest request for a specific app
router.get('/manifest', argoController.getManifests, (req, res) => {
  return res.json(res.locals.manifests)
})

module.exports = router;