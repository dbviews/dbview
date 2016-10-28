class dbService {
  setTables(jsonData) {
    this.tables = jsonData.tables;
    this.connection = jsonData.connection;
  }
}

angular.module('Dbview.dbService', []).service('dbService', [dbService]);