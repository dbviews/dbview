const Sequelize = require('sequelize');

const dbCtrl = {
    getSQL: (loginObj) => {
        const sequelize = new Sequelize(loginObj.database, loginObj.user, loginObj.password, {
            host: loginObj.host,
            dialect: loginObj.dialect,
        });
        return sequelize.query("SELECT * FROM " + loginObj.table, { type: sequelize.QueryTypes.SELECT });
    },
    getMG: (loginObj) => { }
}

module.export = dbCtrl;

// For Reference, loginObj should look like this:
//
// const loginObj = {
//     host: "ec2-54-243-212-72.compute-1.amazonaws.com",
//     database: "d7ctrh5hg6aadj",
//     user: "dxrwecviorvrto",
//     port: 5432,
//     password: "BDyJHAElIeyxjSLNxI1NBYu3Z4",
//     dialect: 'mysql'|'sqlite'|'postgres'|'mssql'
// }