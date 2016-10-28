const Sequelize = require('sequelize');

const dbCtrl = {
    showTables: (obj) => {
        // Object being passed in from userCtrl has a `creds` object that has all login credentials
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        // Obtaining table names as strings and returning them in an array. Special tables in postgres not meant to be shown to user are excluded.
        return sequelize.query(`SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN('pg_catalog', 'information_schema')`, { type: sequelize.QueryTypes.SELECT })
            // Result is a large array full of smaller array, which each has a table name. Formatting to a simpler array before returning it to userCtrl.
            .then((results) => { return results.map(result => result[0]) });
    },

    getTable: (obj) => {
        // Object being passed in from userCtrl has a `creds` object that has all login credentials.
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        // Returns table requested. Table name is requested using the `table` property of the object.
        return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT });
    },

    insertRow: (obj) => {
        // Object being passed in from userCtrl has a `creds` object that has all login credentials.
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });

        // Inserting values (from the `valuesToInsert` property) and returning table.
        return sequelize.query(`INSERT INTO ${obj.table} VALUES ${obj.valuesToInsert}`, { type: sequelize.QueryTypes.INSERT })
            .then((results) => { return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT }) });
    },

    deleteRow: (obj) => {
        // Object being passed in from userCtrl has a `creds` object that has all login credentials.
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });

        // Deleting row and returning table.
        return resolve(sequelize.query(`DELETE FROM ${obj.table} WHERE ${obj.key}=${obj.value}`, { type: sequelize.QueryTypes.DELETE }))
            .then((results) => { return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT }) });
    },
    updateRow: (obj) => {
        // Object being passed in from userCtrl has a `creds` object that has all login credentials.
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });

        // Building string of columns tp update.
        let columnsToUpdate = '';
        for (let n in obj.columns) columnsToUpdate += ` ${n}=${obj.columns[n]},`;

        // Updating row and returning table.
        return sequelize.query(`UPDATE ${obj.table} SET ${columnsToUpdate}` + obj.key === undefined ? `` : ` WHERE ${obj.key}=${obj.value}`, { type: sequelize.QueryTypes.UPDATE })
            .then((results) => { return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT }) });
    },

    createTable: (obj) => {
        // Object being passed in from userCtrl has a `creds` object that has all login credentials.
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });

        // Building string of columns and column types.
        let columnsToAdd = '(';
        for (let n in obj.columns) columnsToAdd += ` ${n} ${obj.columns[n]},`;
        columnsToAdd += ')';

        // Creating table and returning it.
        return sequelize.query(`CREATE TABLE ${obj.table} ${columnsToAdd}`)
            .then((results) => { return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT }) });
    }
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