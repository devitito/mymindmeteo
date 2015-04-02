/**
 *
 *
 */
describe('The welcome Angular module', function() {

  beforeEach(function () {
    module('welcome');
  });

  describe("routes", function() {

    beforeEach(inject(function(_$location_, _$route_, _$rootScope_, _$httpBackend_) {
      this.location = _$location_;
      this.route = _$route_;
      this.rootScope = _$rootScope_;
      this.scope = this.rootScope.$new();
      this.httpBackend = _$httpBackend_;
      this.httpBackend.expectGET('/csrfToken').respond(200);
    }));

    describe("/", function() {
      it('should be defined', function() {
        expect(this.location.path()).toBe( '' );
        this.httpBackend.expectGET('/templates/welcome/partials/homepage.html').respond(200);
        this.location.path('/');
        this.rootScope.$digest();
        expect(this.location.path()).toBe( '/' );
        expect(this.route.current.controller).toBe('guestCtrl');
        expect(this.route.current.templateUrl).toEqual('/templates/welcome/partials/homepage.html');
      });
    });

    describe("/register", function() {
      it('should be defined', function() {
        expect(this.location.path()).toBe( '' );
        this.httpBackend.expectGET('/templates/welcome/partials/register.html').respond(200);
        this.location.path('/register');
        this.rootScope.$digest();
        expect(this.location.path()).toBe( '/register' );
        expect(this.route.current.controller).toBe('guestRegCtrl');
        expect(this.route.current.templateUrl).toEqual('/templates/welcome/partials/register.html');
      });
    });

    describe("/session/new", function() {
      it('should be defined', function() {
        expect(this.location.path()).toBe( '' );
        this.httpBackend.expectGET('/templates/welcome/partials/signup.html').respond(200);
        this.location.path('/session/new');
        this.rootScope.$digest();
        expect(this.location.path()).toBe( '/session/new' );
        expect(this.route.current.controller).toBe('newSessionCtrl');
        expect(this.route.current.templateUrl).toEqual('/templates/welcome/partials/signup.html');
      });
    });
  });
});
