class dbService {

  constructor() {
    this.onlineTables = [];
    this.tableData = {};
  }

  setTables(jsonData) {
    this.tables = jsonData;
  }
  setCreds(creds) {
    this.creds = creds;
  }
  activateTable(table) {
    if (!(this.onlineTables).includes(table)) this.onlineTables.push(table);
  }
  addTableData(table, data) {
    if (this.tableData[table] !== undefined) this.tableData[table] = data;
  }
}

angular.module('Dbview.dbService', []).service('dbService', [dbService]);