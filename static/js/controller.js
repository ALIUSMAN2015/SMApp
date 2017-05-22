angular.module('starter')
.controller("signupCtrl", function($scope, $http, $state){
		$scope.user = [{}];
		$scope.signup = function(eve){
            console.log($scope.user)
			$http.post("/api/signup", {data : $scope.user})
				.success(function(response){
					console.log(response);
					$state.go("login");
				})
				.error(function(err){
					console.log(err);
				});
		};
		
		
	})

   	.controller("loginCtrl", function($scope, $http, $state){
		$scope.User = {};
		$scope.login = function(){
			$http.post("/api/login", {data : $scope.user})
				.success(function(response){
					if(response.token){
						localStorage.setItem('token', response.token);
						$state.go("home");
					}
				})
				.error(function(err){
					console.log(err);
				});
		};
		
	})
      	.controller("comCtrl", function($scope, $http, $state){
		$scope.com = {};
		$scope.com = function(){
            console.log($scope.com);
            $http.post('/api/company',{data : $scope.com})
            .success(function(response){
                console.log(response);
                $state.go('SMdata');
            })
            .error(function(err){
                console.log(err);
            });
        };
		
	})
    .controller('smCtrl', function ($scope,$http) {
        console.log('smctrl running');
        var refresh = function(){
                $http.get('/api/smlist').success(function(response){
                console.log('data get by controller');
                 $scope.smlist = response;
                 $scope.sm = "";
        });
        };
        refresh();
       
        $scope.addsm = function(){
            console.log($scope.sm);
            $http.post('/api/smlist',$scope.sm)
            .success(function(response){
                console.log(response);
                refresh();
            });
        };
      $scope.remove= function(id){
          console.log(id);
          $http.delete('/api/smlist/' + id).success(function(response){
              refresh();
          });
      };
      $scope.edit = function(id) {
          console.log(id);
           $http.get('/api/smlist/' + id).success(function(response){
              $scope.sm = response;
          });
      };
      $scope.update = function (id) {
          console.log($scope.sm._id);
        //   $http.put('/api/smlist/' + id,$scope.sm._id,$scope.sm);
      };
 
})
    .controller('homeCtrl', function ($scope,$http,$state) {
    console.log('home page ctrl');
    $scope.home = function(login){
        if(login != null) {
            $state.go('home');
        }else{
            $state.go('login');
        }
    }

});
