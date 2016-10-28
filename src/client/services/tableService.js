
class tableService {
  setData(jsonData) {
    this.rawdata = jsonData
  }
}

angular.module('Dbview.tableService', []).service('tableService', [tableService]);