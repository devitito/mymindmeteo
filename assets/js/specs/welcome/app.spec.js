/**
 *
 *
 */
describe('The welcome Angular module', function() {

  beforeEach(function () {
    module('welcome');
  });

  describe("routes", function() {

    beforeEach(inject(function(_$location_, _$route_, _$rootScope_, _$httpBackend_, $templateCache) {
      this.location = _$location_;
      this.route = _$route_;
      this.rootScope = _$rootScope_;
      this.scope = this.rootScope.$new();
      this.httpBackend = _$httpBackend_;
      this.httpBackend.expectGET('/csrfToken').respond(200);
      /*this.$templateCache = $templateCache;
      this.$templateCache.put('assets/templates/welcome/partials/homepage.html', '');
      JST = {
        "assets/templates/welcome/partials/homepage.html": function () {
          return 'homepage';
        },
        "assets/templates/welcome/partials/navbar-landing.html": function () {
          return 'landing';
        }
      };*/
    }));

    describe("/", function() {
      it('should be defined', function() {
        //console.log(JST);
        expect(this.location.path()).toBe( '' );
        //this.httpBackend.expectGET('/templates/welcome/partials/homepage.html').respond(200);
        this.location.path('/');
        this.rootScope.$digest();
        expect(this.location.path()).toBe( '/' );
        expect(this.route.current.controller).toBe('guestCtrl');
        //expect(this.route.current.template).toEqual('/templates/welcome/partials/homepage.html');
        //var template = this.route.current.template();
        //expect(template).toEqual('homepage');
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
        //expect(this.route.current.templateUrl).toEqual('/templates/welcome/partials/register.html');
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
        //expect(this.route.current.templateUrl).toEqual('/templates/welcome/partials/signup.html');
      });
    });
  });
});
