angular.module('app')
    .controller('ConferencesController', ['$scope','ConferencesService','$ionicLoading','$state','$timeout', function($scope,ConferencesService,$ionicLoading,$state,$timeout)
    {
        console.log('--- ConferencesController ---');

        $scope.conferences = [];
        $scope.scheduleconferences = [];
        $scope.numButton = 1;
        $scope.sortByRooms = true;
        $scope.selectedConferenceId = -1;

        $scope.getAllConf = function(){
            $scope.loading = $ionicLoading.show({
                content: '<div>Loading conferences list<br><figure><img src="img/atos-loader.gif"/></figure></div>',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            $timeout(function(){
                    ConferencesService.getConferencesResource().query(
                        function(data){
                            $scope.conferences = data;
                            $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
                            $scope.loading.hide();
                            //$scope.updateConference();
                        },
                        function(reason){
                            console.log(reason);
                            alert('Unable to retrieve conferences list');
                            $scope.loading.hide();
                        }
                    );
            },1000);
         }

       $scope.updateConference = function(){

          /* $scope.loading = $ionicLoading.show({
               content: '<div>Update conferences list<br><figure><img src="img/atos-loader.gif"/></figure></div>',
               animation: 'fade-in',
               showBackdrop: true,
               maxWidth: 200,
               showDelay: 0
           });

            ConferencesService.getOnlineConference().query(
                function(confOnline){
                    console.log('Same confLocal-confOnline : '+ ConferencesService.checkSameConferences($scope.conferences,confOnline));
                    if(!ConferencesService.checkSameConferences($scope.conferences,confOnline)){
                        console.log("Update conference on device");
                        $scope.conferences = confOnline;
                        ConferencesService
                        //TO DO
                        //update local conference with a Online conference
                        //OR
                        ConferencesService.setConferencesResource(confOnline);
                        $scope.loading.hide();
                    }else{
                        $scope.loading.hide();
                        console.log("Conference on device already last update");
                    }
                },
                function(reason){
                    $scope.loading.hide();
                    alert("no connexion");
                    console.log(reason);
                    return -1;
                }
            );*/
        }

        $scope.DisplayConference = function(conference){
            if($scope.selectedConferenceId == conference._id)
                $scope.selectedConferenceId = -1;
            else
                $scope.selectedConferenceId = conference._id;
        }

        $scope.viewConference = function(idConference){
            $state.go('tab.conference-detail',{conferenceId: idConference})
        }

        $scope.addToAgenda =function(conference){
            alert("Do you want to add\n\""+conference.title+"\"\non your agenda ?");
        }
    }]);