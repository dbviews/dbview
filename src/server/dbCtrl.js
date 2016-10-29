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
        //Need to find out if MySQL needs CreatedAt and UpdatedAt fields
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        let columnsToAdd = ``;
        let valuesToAdd = ``;
        for (let n in obj.valuesToInsert) {
            columnsToAdd += ` ${n},`;
            valuesToAdd += ` '${obj.valuesToInsert[n]}',`;
        }
        columnsToAdd = columnsToAdd.slice(1, -1);
        columnsToAdd = `(${columnsToAdd}, "createdAt", "updatedAt")`;
        valuesToAdd = valuesToAdd.slice(1, -1);
        valuesToAdd = `(${valuesToAdd}, NOW(), NOW())`;

        // Inserting values (from the `valuesToInsert` property) and returning table.
        return sequelize.query(`INSERT INTO ${obj.table} ${columnsToAdd} VALUES ${valuesToAdd}`, { type: sequelize.QueryTypes.INSERT })
            .then((results) => { return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT }) });
    },

    deleteRow: (obj) => {
        // Object being passed in from userCtrl has a `creds` object that has all login credentials.
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        
        return sequelize.query(`DELETE FROM ${obj.table} WHERE ${obj.where}`, { type: sequelize.QueryTypes.DELETE })
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
        for (let n in obj.valuesToInsert) columnsToUpdate += ` ${n}=${obj.valuesToInsert[n]},`;
        columnsToUpdate = columnsToUpdate.slice(1, -1);

        // Updating row and returning table.
        return sequelize.query(`UPDATE ${obj.table} SET ${columnsToUpdate} WHERE ${obj.where}`, { type: sequelize.QueryTypes.UPDATE })
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
        let columnsToAdd = `(`;
        for (let n in obj.valuesToInsert) columnsToAdd += ` "${n}" ${obj.valuesToInsert[n]},`;
        columnsToAdd = columnsToAdd.slice(0, -1);
        columnsToAdd += `)`;

        // Creating table and returning it.
        return sequelize.query(`CREATE TABLE IF NOT EXISTS ${obj.table} ${columnsToAdd}`)
            .then((results) => { return sequelize.query(`SELECT * FROM ${obj.table}`, { type: sequelize.QueryTypes.SELECT }) });
    },

    dropTable: (obj) => {
        // Object being passed in from userCtrl has a `creds` object that has all login credentials.
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });

        // Deleting table, then returning list of table names.
        return sequelize.query(`DROP TABLE ${obj.where}`)
            .then((results) => {
                return sequelize.query(`SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN('pg_catalog', 'information_schema')`, { type: sequelize.QueryTypes.SELECT })
                    .then((results) => { return results.map(result => result[0]) });
            });
    },

    commandLine: (obj) => {
        // Object being passed in from userCtrl has a `creds` object that has all login credentials
        const sequelize = new Sequelize(obj.creds.database, obj.creds.user, obj.creds.password, {
            host: obj.creds.host,
            dialect: obj.creds.dialect,
            dialectOptions: { ssl: true }
        });
        // Executing raw command
        return sequelize.query(obj.where)
            // Return results
            .then((results) => { return results[0] });
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