const axios = require('axios');

const argoController = {};

argoController.setToken = (req, res, next) => {
  axios.get('https://localhost:8080/api/v1/applications/guestbook/manifests', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJqYXNvbjphcGlLZXkiLCJuYmYiOjE2NzU3OTU2NzYsImlhdCI6MTY3NTc5NTY3NiwianRpIjoiZDg1M2QwYzgtNDI1MC00NGRlLTlhOTQtYjI1NjZmY2UxOGI5In0.ZH83uroRxmuckUA1oX5vjeubYm9JN-TEli_qKcBxJc0`,
    }
  })
    .then((data) => {
      console.log(data.data.items);
      res.locals.manifest = data.data;
      return next();
    })
}

module.exports = argoController;