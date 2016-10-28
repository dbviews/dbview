const dbCtrl = require('./dbCtrl');

const userCtrl = {};

userCtrl.sendDB = (req, res) => {
  dbCtrl.getSQL(req.body)
  .then( (result) => {
    res.json(result.get());
  })
  .catch( (err) => res.end(err) );
}




module.export = userCtrl;





