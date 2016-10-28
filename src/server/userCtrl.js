const dbCtrl = require('./dbCtrl');

const userCtrl = {};

userCtrl.sendDB = (req, res) => {
  dbCtrl.getSQL(req.body)
  .then( (result) => {
    res.json(result);
  })
  .catch( (err) => {
    console.log(err);
    res.end('error') 
  });
}


module.exports = userCtrl;





