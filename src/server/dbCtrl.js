const Sequelize = require('sequelize');

const dbCtrl = {
    showTables: (loginObj) => {
        const sequelize = new Sequelize(loginObj.database, loginObj.user, loginObj.password, {
            host: loginObj.host,
            dialect: loginObj.dialect,
        });
        sequelize.query("SHOWTABLES", { type: sequelize.QueryTypes.SHOWTABLES })
            .then((results) => { return { connection: sequelize, tables: results }; });
    },
    getTable: (obj) => {
        return obj.sequelize.query("SELECT * FROM " + obj.tablename, { type: sequelize.QueryTypes.SELECT });
    },
    insertRow: (obj) => {
        obj.sequelize.query("INSERT INTO " + tablename + " VALUES " + obj.valuesToInsert,
            { type: obj.sequelize.QueryTypes.INSERT })
            .then(() => { return obj.sequelize.query("SELECT * FROM " + obj.tablename, { type: obj.sequelize.QueryTypes.SELECT }); });
    },
    updateTable: (obj) => {
        obj.sequelize.query("UPDATE " + obj.tablename + " SET " + obj.columnsToChange + !obj.columnSelectionCondition ? "" : " WHERE " + obj.columnSelectionCondition,
            { type: sequelize.QueryTypes.UPDATE })
            .then(() => { return obj.sequelize.query("SELECT * FROM " + obj.tablename, { type: obj.sequelize.QueryTypes.SELECT }); });
    },
    getMG: (loginObj) => { }
}

module.exports = dbCtrl;

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