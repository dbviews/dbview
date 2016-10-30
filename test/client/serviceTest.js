describe('tableService', function(){
  var tableService;
	beforeEach(module('Dbview.tableService'));
   beforeEach(inject(function (_tableService_) {
    tableService = _tableService_;
  }));

    it('should add data to rawdata property', function() {
      tableService.addTableData('myTable', {a: 3});
      expect(tableService.tableData.myTable).to.deep.equal({a: 3});
    });

  it('should retrieve rawdata', function() {
      tableService.tableData.myTable = {a: 5};
      expect(tableService.getData('myTable')).to.deep.equal({a: 5});
    });

  it('should add table to active tables array when table is activated', function () {
    tableService.activateTable('mytable');
    expect(tableService.activeTables).to.contain('mytable');
  });

  });

  describe('dbService', function(){
  var dbService;
	beforeEach(module('Dbview.dbService'));
   beforeEach(inject(function (_dbService_) {
    dbService = _dbService_;
  }));

    it('should add data to table data property', function() {
      dbService.setTables({'myTable': [3]});
      expect(dbService.tables).to.deep.equal({'myTable': [3]});
    });

  it('should add credentials to creds property', function() {
      dbService.setCreds({name: 'Gregor'})
      expect(dbService.creds).to.deep.equal({name: 'Gregor'});
    });
  });

  