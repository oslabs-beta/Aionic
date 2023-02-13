const axios = require('axios');

const argoController = {};

argoController.setToken = (req, res, next) => {
  axios.get('https://localhost:8080/api/v1/applications/example-app/manifests', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJhcmk6YXBpS2V5IiwibmJmIjoxNjc1OTgyNTU2LCJpYXQiOjE2NzU5ODI1NTYsImp0aSI6ImZkYjYxNjE2LThlOTItNGJhMC1iODliLWMzOTJlZGYxZDQ2ZSJ9.DzeHGxvV_WknvW4e9TcHrsH-f6yc-_l09itNwpe0Luc`,
    }
  })
    .then((data) => {
      console.log(data.data.items);
      res.locals.manifest = data.data;
      return next();
    })
}

module.exports = argoController;