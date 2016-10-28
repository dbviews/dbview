const dbCtrl = require('./dbCtrl');

const userCtrl = {};

userCtrl.sendTableList = (req, res) => {
  dbCtrl.showTables(req.body)
  .then( (result) => {
    res.json(result);
  })
  .catch( (err) => {
    console.log(err);
    res.end('error') 
  });
}

userCtrl.sendTable = (req, res) => {
  dbCtrl.getTable(req.body)
  .then( (result) => {
    res.json(result);
  })
  .catch( (err) => {
    console.log(err);
    res.end('error') 
  });  
}

// userCtrl.createTable = (req, res) => {
//   dbCtrl.Table(req.body)
//   .then( (result) => {
//     res.json(result);
//   })
//   .catch( (err) => {
//     console.log(err);
//     res.end('error') 
//   });  
// }

userCtrl.insertEntry = (req, res) => {
  dbCtrl.insertRow(req.body)
  .then( (result) => {
    res.json(result);
  })
  .catch( (err) => {
    console.log(err);
    res.end('error') 
  });  
}

userCtrl.updateEntry = (req, res) => {
  dbCtrl.updateRow(req.body)
  .then( (result) => {
    res.json(result);
  })
  .catch( (err) => {
    console.log(err);
    res.end('error') 
  });  
}

userCtrl.deleteEntry = (req, res) => {
  dbCtrl.deleteRow(req.body)
  .then( (result) => {
    res.json(result);
  })
  .catch( (err) => {
    console.log(err);
    res.end('error') 
  });  
}



module.exports = userCtrl;





