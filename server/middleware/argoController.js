const axios = require('axios');

const argoController = {};

argoController.setToken = (req, res, next) => {
  axios.get('http://localhost:8080/api/v1/applications/example-app/manifests', {
    headers: {
      Cookie: 'argocd.token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJhcmk6YXBpS2V5IiwibmJmIjoxNjc1NzI3NzM4LCJpYXQiOjE2NzU3Mjc3MzgsImp0aSI6ImM4OTczMjY3LTYwOWUtNGRjYy05NTNjLTdiZWNkOTBjMDYwMyJ9.dfQuOxHVXqSMK4I_7mSKeZewnNhp-PElv-1V1XC0qc0'
    }
  })
    .then((data) => {
      console.log(data.data);
      res.locals.manifest = data.data;
      return next();
    })
}

module.exports = argoController;