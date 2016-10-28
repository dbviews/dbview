const Sequelize = require('sequelize');

const dbCtrl = {
    showTables: (obj) => {
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        return sequelize.query(`SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN('pg_catalog', 'information_schema')`, { type: sequelize.QueryTypes.SELECT })
            .then((results) => { return results.map(result => result[0]) });
    },
    getTable: (obj) => {
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT });
    },
    insertRow: (obj) => {
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        const inserted = new Promise((resolve, reject) => {
            resolve(sequelize.query(`INSERT INTO ${obj.table} VALUES ${obj.valuesToInsert}`, { type: sequelize.QueryTypes.INSERT }));
        }).then((results) => { return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT }) });
    },
    deleteRow: (obj) => {
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        const deleted = new Promise((resolve, reject) => {
            resolve(sequelize.query(`DELETE FROM ${obj.table} WHERE ${obj.key}=${obj.value}`, { type: sequelize.QueryTypes.DELETE }));
        }).then((results) => { return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT }) });
    },
    updateRow: (obj) => {
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        const created = new Promise((resolve, reject) => {
            let columnsToUpdate = '';
            for (let n in obj.columns) columnsToUpdate += ` ${n}=${obj.columns[n]},`;
            resolve(sequelize.query(`UPDATE ${obj.table} SET ${columnsToUpdate}` + obj.key===undefined ? `` : ` WHERE ${obj.key}=${obj.value}`, { type: sequelize.QueryTypes.UPDATE }));
        }).then((results) => { return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT }) });
    },
    createTable: (obj) => {
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        const created = new Promise((resolve, reject) => {
            let columnsToAdd = '(';
            for (let n in obj.columns) columnsToAdd += ` ${n} ${obj.columns[n]},`;
            columnsToAdd += ')';
            resolve(sequelize.query(`CREATE TABLE ${obj.table} ${columnsToAdd}`));
        }).then((results) => { return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT }) });
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