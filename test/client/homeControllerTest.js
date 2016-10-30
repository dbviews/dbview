
describe('HomeController', function () {
  var homeController, httpBackend, dbService, location;

  // load the required modules to run these tests
  beforeEach(module('Dbview.HomeController'));
  beforeEach(module('Dbview.dbService'));

  // inject the controller and services we will need to run tests
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location, _dbService_) {
    dbService = _dbService_; // karma accesses our own services by padding with underscores
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    location = $location;
    homeController = $controller('HomeController', {
      $scope: scope,
      $httpBackend: $httpBackend
    });
  }));

  // actual tests
  describe('post', function () {
    it('should send credentials in post', function () {
      scope.creds = { username: 'Gregor' }
      httpBackend.expectPOST('/requestDB', { creds: { username: 'Gregor' } }).respond(201);
      scope.post();
      httpBackend.flush();
    })

    it('should call dbService setTable with the response to post', function () {
      httpBackend.whenPOST('/requestDB').respond(200, { table: 'Gregor\'s Table' });
      var spy = sinon.spy(dbService, 'setTables');
      scope.post();
      httpBackend.flush();
      expect(spy.args[0][0]).to.deep.equal({ table: 'Gregor\'s Table' });
    })

    it('should redirect to /db after a successful post request', function () {
      httpBackend.whenPOST('/requestDB').respond(200, { table: 'Gregor\'s Table' });
      scope.post();
      httpBackend.flush();
      expect(location.path()).to.equal('/db');
    })

    it('should stay on home page if post request fails', function () {
      httpBackend.whenPOST('/requestDB').respond(400);
      scope.post();
      httpBackend.flush();
      expect(location.path()).to.equal('');
    })
  });
});