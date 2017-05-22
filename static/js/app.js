angular.module('starter', ['ionic'])
  .config(function($stateProvider, $urlRouterProvider,$httpProvider ){
    
    
    $stateProvider
      .state("login", {
        url : "/login",
        templateUrl : "/templetes/login.html",
        controller  : "loginCtrl" 
      })
      .state("signup", {
        url : "/signup",
        templateUrl : "/templetes/signup.html",
        controller  : "signupCtrl" 
      })
      .state("home", {
        url : "/Home",
        templateUrl : "/templetes/home.html",
        controller  : "homeCtrl",
        loginCompulsory : true
      })
         .state("company", {
        url : "/company",
        templateUrl : "/templetes/company.html",
        controller  : "comCtrl" 
      })
        .state("smdata", {
        url : "/SMdata",
        templateUrl : "/templetes/SMdata.html",
        controller  : "smCtrl" 
      });
      
      
      $urlRouterProvider.otherwise("/");
      
      
    //   $httpProvider.interceptors.push('httpInterceptor');
  })
.run(function($rootScope, $state){
    
    $rootScope.$on("$stateChangeStart", function(event, toState){
      var firebaseLocalToken = localStorage.getItem("token");
        
      if(toState.loginCompulsory && !firebaseLocalToken){ 
        event.preventDefault();
        $state.go("login");
      }
        
    });
    
  })
  .factory("httpInterceptor", function(){
    return {
      request : function(config){
        var token = localStorage.getItem("token");
        if(token){
          config.url = config.url + "?token="+token;
        }
        return config;
      }
    }       
  });