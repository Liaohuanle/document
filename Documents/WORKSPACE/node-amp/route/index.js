const countDown = require('../util/index')
module.exports = (app) => {
  app.get('/', function(req, res) {
    res.render('../views/layout', { countDown })
  })
}