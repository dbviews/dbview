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
}

angular.module('Dbview.dbService', []).service('dbService', [dbService]);