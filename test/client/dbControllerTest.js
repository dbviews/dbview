
describe('DbController', function () {
  var homeController, httpBackend, dbService, tableService, location;

  // load the required modules to run these tests
  beforeEach(module('Dbview.DbController'));
  beforeEach(module('Dbview.dbService'));
  beforeEach(module('Dbview.tableService'));


  // inject the controller and services we will need to run tests
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location, _dbService_, _tableService_) {
    dbService = _dbService_; // karma accesses our own services by padding with underscores
    tableService = _tableService_
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    location = $location;
    dbController = $controller('DbController', {
      $scope: scope,
      $httpBackend: $httpBackend
    });
  }));

  // actual tests
  describe('requestTable', function () {
    it('should send credentials and a table name in a post request', function () {
      dbService.creds = { username: 'Gregor' }
      httpBackend.expectPOST('/requestTable', {
        creds: { username: 'Gregor' },
        table: 'Gregor\'s SQL Table'
      }).respond(201);
      scope.requestTable('Gregor\'s SQL Table');
      httpBackend.flush();
    })

    it('should call activateTable with scope, tableName, and tableService after a succesful request', function () {
      httpBackend.whenPOST('/requestTable').respond(200, { table: 'Gregor\'s Table' });
      sinon.spy(scope, 'activateTable');
      scope.requestTable('Gregor\'s SQL Table');
      httpBackend.flush();
      expect(scope.activateTable.calledWith(scope, 'Gregor\'s SQL Table', tableService)).to.be.ok;
    })

    it('should call addTable data to save the table data in the tableService', function () {
      httpBackend.whenPOST('/requestTable').respond(200, { data: '{Datas: 0}' });
      sinon.spy(tableService, 'addTableData');
      scope.requestTable('Gregor\'s SQL Table');
      httpBackend.flush();
      expect((tableService.addTableData).calledWith('Gregor\'s SQL Table', { data: '{Datas: 0}' })).to.be.ok;
    })
  })

  describe('activateTable', function () {
    it('should call activate table if table is not activated yet', function () {
      sinon.spy(tableService, 'activateTable')
      scope.activateTable(scope, 'myTable', tableService);
      expect((tableService.activateTable).calledWith('myTable')).to.be.ok;
    })

    it('should not call activate table if table is already activated', function () {
      sinon.spy(tableService, 'activateTable')
      scope.onlineTables = ['myTable']
      scope.activateTable(scope, 'myTable', tableService);
      expect((tableService.activateTable).called).to.not.be.ok;
    })
  })
});