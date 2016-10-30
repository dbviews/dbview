
describe('TableController', function () {
  var tableController, httpBackend, dbService, location;

  // load the required modules to run these tests
  beforeEach(module('Dbview.TableController'));
  beforeEach(module('Dbview.dbService'));
  beforeEach(module('Dbview.tableService'));

  // inject the controller and services we will need to run tests
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location, _dbService_, _tableService_) {
    dbService = _dbService_; // karma accesses our own services by padding with underscores
    tableService = _tableService_
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    location = $location;
    tableController = $controller('TableController', {
      $scope: scope,
      $httpBackend: $httpBackend
    });
  }));

  // actual tests
  describe('saveEntry', function () {
    it('should save column and value in scope', function () {
      scope.saveEntry('Gregor\'s Column', 'Gregor\'s Value');
      expect(scope.rowsToAdd).to.deep.equal({ 'Gregor\'s Column': 'Gregor\'s Value' });
    })

    it('should clear column name and entry value forms', function () {
      scope.saveEntry('Gregor\'s Column', 'Gregor\'s Value');
      expect(scope.columnName).to.equal('');
      expect(scope.entryValue).to.equal('');
    })
  });

  describe('executeQuery', function () {
    it('makes a post request to the correct route', function () {
      scope.queryType = 'Create Table';
      httpBackend.expectPOST('/createTable', { "where": "query", "valuesToInsert": {}, "table": "" }).respond(200, [{ a: 3 }]);
      scope.executeQuery('query');

      scope.queryType = 'Insert Rows';
      httpBackend.expectPOST('/insert', { "where": "query", "valuesToInsert": {}, "table": "" }).respond(200, [{ a: 3 }]);
      scope.executeQuery('query');

      scope.queryType = 'Update Rows';
      httpBackend.expectPOST('/update', { "where": "query", "valuesToInsert": {}, "table": "" }).respond(200, [{ a: 3 }]);
      scope.executeQuery('query');

      scope.queryType = 'Delete Rows';
      httpBackend.expectPOST('/delete', { "where": "query", "valuesToInsert": {}, "table": "" }).respond(200, [{ a: 3 }]);
      scope.executeQuery('query');

      scope.queryType = 'Drop Table';
      httpBackend.expectPOST('/dropTable', { "where": "query", "valuesToInsert": {}, "table": "" }).respond(200, [{ a: 3 }]);
      scope.executeQuery('query');

      scope.queryType = 'Text Query';
      httpBackend.expectPOST('/query', { "where": "query", "valuesToInsert": {}, "table": "" }).respond(200, [{ a: 3 }]);
      scope.executeQuery('query');
      httpBackend.flush();
    })

    it('sends object with creds, where clause, values to insert, and tablename', function () {
      scope.queryType = 'Insert Rows';
      scope.rowsToAdd = { 'Gregor\'s Column': 'Gregor\'s Value' }
      scope.name = 'Gregor\'s Table';
      httpBackend.expectPOST('/insert', {
        where: "query",
        valuesToInsert: { 'Gregor\'s Column': 'Gregor\'s Value' },
        table: "Gregor\'s Table"
      }).respond(200, [{ a: 3 }]);
      scope.executeQuery('query');
      httpBackend.flush();
    });

    it('should call add table data method of table service to save response data', function () {
      sinon.spy(tableService, 'addTableData');
      scope.name = 'Gregor\'s Table';
      scope.queryType = 'Update Rows';
      httpBackend.whenPOST('/update').respond(200, [{ b: 3 }]);
      scope.executeQuery('query');
      httpBackend.flush();
      expect((tableService.addTableData).calledWith('Gregor\'s Table', [{ b: 3 }])).to.be.ok;
    });

    it('should update grid data', function () {
      var stub = sinon.stub(tableService, 'getData')
      scope.gridData = {};
      stub.returns([{ 'column 1': 'val' }]);
      scope.name = 'Gregor\'s Table';
      scope.queryType = 'Update Rows';
      httpBackend.whenPOST('/update').respond(200, [{ b: 3 }]);
      scope.executeQuery('query');
      httpBackend.flush();
      expect(scope.gridData.data).to.deep.equal([{ 'column 1': 'val' }])
    });
    
  });
});