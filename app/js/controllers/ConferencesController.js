angular.module('app')
    .controller('ConferencesController', ['$scope','ConferencesService','$ionicLoading','$state', function($scope,ConferencesService,$ionicLoading,$state)
    {
        console.log('--- ConferencesController ---');

        $scope.loading = $ionicLoading.show({
            content: '<div>Loading<br><figure><img src="data/atos-loader.gif"/></figure></div>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        $scope.conferences = [];
        $scope.scheduleconferences = [];
        $scope.numButton = 0;
        $scope.sortByRooms = true;
        $scope.selectedConferenceId = -1;

        $scope.getAllConf = function(){
            ConferencesService.getLocalConferences().query(
                function(data){
                    console.log("Success to retreive Local Conference");
                    $scope.conferences = data;
                    $scope.scheduleconferences = ConferencesService.sortConferenceByStart($scope.conferences);
                    $scope.updateConference();
                },
                function(reason){
                    console.log("Impossible to retreive Local Conference");
                    alert('Unable to retrieve conferences list');
                }
            ).$promise.then(function(){
                    $scope.loading.hide();
                });
         }


        $scope.updateConference = function(){
            ConferencesService.getOnlineConference().query(
                function(confOnline){
                    console.log('Same confLocal-confOnline : '+ ConferencesService.checkSameConferences($scope.conferences,confOnline));
                    if(!ConferencesService.checkSameConferences($scope.conferences,confOnline)){
                        console.log("Update conference on device");
                        $scope.conferences = confOnline;
                        //TO DO
                        //update local conference with a Online conference
                    }else{
                        console.log("Conference on device already last update");
                    }
                },
                function(reason){
                    console.log(reason);
                    return -1;
                }
            );
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