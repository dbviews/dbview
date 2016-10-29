
class tableService {
  constructor() {
    this.activeTables = [];
    this.tableData = {}
  }
  setData(jsonData) {
    this.rawdata = jsonData
  }
  activateTable(tablename) {
    this.activeTables.push(tablename)
  }
  addTableData(table, data) {
    console.log('tableservice:', data);
    console.log('table name', table);
    this.tableData[table] = data;
  }
  getData(table) {
    console.log(this.tableData);
    return this.tableData[table];
  }
}

angular.module('Dbview.tableService', []).service('tableService', [tableService]);