(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeHeaderController', HomeHeaderController);

  HomeHeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', 'ServicetypesService', 'ServicesubtypesService', 'ServicesService', 'geolocation', 'Notification', 'SubserviceTypeServicesService', '$cookies', 'AreasService', 'UserLocation'];

  function HomeHeaderController($scope, $state, Authentication, menuService, ServicetypesService, ServicesubtypesService, ServicesService, geolocation, Notification, SubserviceTypeServicesService, $cookies, AreasService, UserLocation) {
    var vm = this;
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
//        alert(vm.authentication.user.tech_status[0]);
//        console.log(vm.authentication.user.tech_status[0]);

    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    vm.isAdmin = (vm.authentication.user && vm.authentication.user.roles[0] === 'admin');
    vm.areaServiceTypes = [];
    vm.areaServiceSubTypes = [];
    vm.servicetype;
    vm.serviceSubTypes = [];
    vm.autoservices = [];
    vm.updateLocation = '';
    vm.showLogin = showLogin;

//        $scope.foo.findNearestTech({a:1});
    vm.getUserLocation = setGetLocation;

    var input = document.getElementById('updateLocation');

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {

      var place = autocomplete.getPlace();
      vm.updateLocation = decodeURI(place.formatted_address);

      $scope.$apply();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      $scope.coords = {lat: place.geometry.location.lat(), long: place.geometry.location.lng()};

      console.log($scope.coords);
      UserLocation.setUserLocation($scope.coords, place.formatted_address);
      setServiceArea();
    });


    setGetLocation(false);

    vm.services = ServicesService.query();

    vm.serviceTypes = ServicetypesService.query();
    vm.serviceSubTypes = ServicesubtypesService.query();

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }


    function setServiceArea() {
      AreasService.getUserServiceArea($scope.coords, function (response) {
        console.log(response);
        if (typeof response._id == 'undefined') {
          Notification.error({
            message: 'Sorry, we dont provide any service in your selected area.',
            title: '<i class="glyphicon glyphicon-remove"></i> Service Location Error!'
          });
        } else {
          $cookies.put('user_service_area', response._id, {path: '/'});
          Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> location saved successfully!'});
        }
      });
    }

    function setGetLocation(flag) {
      if (flag || typeof $cookies.get('location') == 'undefined') {
        geolocation.getLocation().then(function (data) {
          $scope.coords = {lat: data.coords.latitude, long: data.coords.longitude};
          var latlng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
          var geocoder = geocoder = new google.maps.Geocoder();
          geocoder.geocode({'latLng': latlng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                vm.updateLocation = decodeURI(results[1].formatted_address);

                $scope.$apply();
                UserLocation.setUserLocation($scope.coords, results[1].formatted_address);
                setServiceArea();
                console.log($scope.coords);
              }
            }
          });

//                    Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> location saved successfully!'});
        }).catch(function (res) {
          Notification.error({
            message: 'This site has been blocked from tracking your location on this page.',
            title: '<i class="glyphicon glyphicon-remove"></i> Location Error!'
          });
        });
      } else {
        vm.updateLocation = decodeURIComponent($cookies.get('location'));
      }
    }

    function showLogin(id) {
      $cookies.put('service_login_id', id, {path: '/'});
      jQuery("#guest_or_login_popup").modal('show');
    }
  }
}());
