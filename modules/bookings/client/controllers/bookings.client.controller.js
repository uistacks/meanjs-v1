(function () {
  'use strict';

  angular
    .module('bookings')
    .controller('BookingsController', BookingsController);

  BookingsController.$inject = ['$timeout', 'geolocation', '$stateParams', '$state', '$filter', '$http', '$scope', 'serviceResolve', 'Authentication', 'Upload', 'UserLocation', '$cookies', 'BookingsService', 'BookingtimeslotsService', 'AreasService', 'Notification', 'uiGmapGoogleMapApi', 'InventoriesService'];

  function BookingsController($timeout, geolocation, $stateParams, $state, $filter, $http, $scope, service, Authentication, Upload, UserLocation, $cookies, BookingsService, BookingtimeslotsService, AreasService, Notification, uiGmapGoogleMapApi, InventoriesService) {
    var vm = this;
    vm.service = service;
    vm.arr_time_slots = [];
    vm.booking_dates = [];
    vm.loader = 0;
    vm.submit_flag = 0;
    vm.jobDetail = {};
    vm.distance;
    vm.duration;
    vm.inventories = {};
    vm.checkAvailableTech = checkAvailableTech;
    vm.changeStatus = changeStatus;
    vm.map = {center: {latitude: 23.5392453, longitude: 45.4938145}, zoom: 7};
    vm.tempSelectedInventory = {};
    vm.SelectedInventories = [];
    vm.authentication = Authentication;
    vm.serviceRequirment = serviceRequirment;
    vm.submitEstimation = submitEstimation;
    vm.estimationData;
    vm.estimationSubmitted = false;
    vm.model = {'arr': []};

    vm.clearInput = function (id) {
      $scope.$broadcast('angucomplete-alt:clearInput');
    }


    console.log(vm.service);


    vm.selectedInventory = function (selected) {
      if (selected) {
        // window.alert('You have selected ' + selected.title);
        // console.log(selected.originalObject.price);
        vm.addField(selected);
        vm.clearInput();
      } else {
        console.log('cleared');
      }
    };


    for (var i = 1; i <= 30; i++) {
      var future = new Date();
      vm.booking_dates.push(new Date(future.setDate(future.getDate() + i)).toString());
    }
    if (typeof $cookies.get('location') != 'undefined') {
      vm.location = $cookies.get('location');
    } else {
      vm.location = 'N/A';
    }

    if (typeof $stateParams.bookingId != 'undefined') {


      BookingsService.getJobDetail({bookingId: $stateParams.bookingId}, function (res) {
        vm.jobDetail = res;
        var address = '';

        vm.map = {
          zoom: 10,
          center: {latitude: vm.jobDetail.location.coordinates[1], longitude: vm.jobDetail.location.coordinates[0]}
        };

        vm.marker = [
          {
            'id': '0',
            'coords': {
              'latitude': vm.jobDetail.technician.location.coordinates[1],
              'longitude': vm.jobDetail.technician.location.coordinates[0]
            },
            'window': {
              'title': 'Technician location.'
            }
          },
          {
            'id': '1',
            'coords': {
              'latitude': vm.jobDetail.location.coordinates[1],
              'longitude': vm.jobDetail.location.coordinates[0]
            },
            'window': {
              'title': 'Customer Service location.'
            }
          }
        ];


        var inventoryParam = {
          servicetype: vm.jobDetail.servicetype,
          area: vm.jobDetail.area,
        };


        InventoriesService.getTechInventories(inventoryParam, function (res) {
          vm.inventories = res;
        });
      });
    }
    BookingtimeslotsService.getAreaSlot({area: $cookies.get('user_service_area')}, function (response) {
      vm.aeraSlot = response;
    });

    AreasService.getStandardWorkHours({area: $cookies.get('user_service_area')}, function (response) {
      vm.standardWorkHour = response;


      if (typeof response.from != 'undefined') {
        var start_time = $filter('date')(response.from_time, 'HH:mm', 'UTC+05:30');
        var end_time = $filter('date')(response.to_time, 'HH:mm', 'UTC+05:30');

        var arr_start_time = start_time.split(':');
        var arr_end_time = end_time.split(':');


        for (var i = parseInt(arr_start_time[0]); i <= parseInt(arr_end_time[0]); i++) {
          vm.arr_time_slots.push(i + ':' + arr_start_time[1]);
        }
        vm.arr_time_slots[vm.arr_time_slots.length - 1] = end_time;
      }
    });


    function serviceRequirment(isValid) {
      $scope.submitted = true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.serviceRequirmentForm');
        return false;
      }
      var area_id = $cookies.get('user_service_area');
      var cords = $cookies.getObject('cords');
      vm.service_requirments.area = area_id;
      vm.service_requirments.service = vm.service._id;
      vm.service_requirments.servicetype = vm.service.servicetype;

      if (typeof cords != 'undefined') {
        vm.service_requirments.cords = cords;
      } else {
        Notification.error({
          message: 'Kindly select your location to continue booking.',
          title: '<i class="glyphicon glyphicon-remove"></i> Service Location Error!',
          delay: 10000
        });

        return;
      }


      var data = {
        service_id: vm.service._id,
        area_id: area_id,
        cords: cords
      };

      BookingsService.findNearestTech(data, function (res) {
        if (typeof res[0] == 'undefined') {
          Notification.error({
            message: 'Sorry, we dont find any available technician right now, you can "Schedule" a service or can try after some time.',
            title: '<i class="glyphicon glyphicon-remove"></i> Technician not available !',
            delay: 10000
          });
        } else {
          vm.service_requirments.tech_id = res[0]._id;
          BookingsService.bookService(vm.service_requirments, function (response) {
            if (typeof response._id != 'undefined') {
//                            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> Your service has been booked successfully! You can track your service in "Service Overviews > On-Going Services" section.', title: 'Success!!!', delay: 5000});

              swal({
                title: 'Service Booked Successfully!',
                text: 'Your service has been booked successfully! You can track your service in "Service Overviews > On-Going Services" section',
                icon: 'success',
                closeOnClickOutside: false,
              }, function () {
                window.location = '/';
              });
            } else {
              Notification.error({
                message: '<i class="glyphicon glyphicon-ok"></i> Oops somthing went wrong. Please try again.',
                delay: 5000
              });

            }
          });
        }
      });

    }

    function changeStatus(status, msg) {

      if (!confirm(msg)) {
        vm.formStatus = vm.jobDetail.status[0];
        if (!$scope.$$phase) {
          $scope.$apply();
        }
        return false;

      }
      BookingsService.changeBookingStatus({status: status, job_id: vm.jobDetail._id}, function (res) {
        vm.jobDetail = res.booking;

        if (status === 'estimation') {
          jQuery("#estimation_popup").appendTo('body').modal('show');
        }
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      });

    }

    function checkAvailableTech(service_id) {
      vm.loader = 1;
      var area_id = $cookies.get('user_service_area');
      var cords = $cookies.getObject('cords');

      if (typeof area_id == 'undefined') {
        jQuery("#location_popup").modal('show');
        vm.loader = 0;
        return;
      }

      var data = {
        service_id: service_id,
        area_id: area_id,
        cords: cords
      };

      BookingsService.findNearestTech(data, function (res) {
        if (typeof res[0] == 'undefined') {
          Notification.error({
            message: 'Sorry, we dont find any available technician right now, you can "Schedule" a service or can try after some time.',
            title: '<i class="glyphicon glyphicon-remove"></i> Technician not available !',
            delay: 10000
          });
          vm.loader = 0;
        } else {
          vm.submit_flag = 1;
          vm.loader = 0;

          var cords = $cookies.getObject('cords');
          var origin = new google.maps.LatLng(cords.lat, cords.long);
          var destination = new google.maps.LatLng(res[0].location.coordinates[1], res[0].location.coordinates[0]);

          var service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: [origin],
              destinations: [destination],
              travelMode: 'DRIVING',
              drivingOptions: {
                departureTime: new Date(Date.now() + 1000),  // for the time N milliseconds from now.
                trafficModel: 'optimistic'
              }
            }, callback);
        }
      });

    }

    function callback(response, status) {
      // See Parsing the Results for
      // the basics of a callback function.
      console.log(response);
      vm.distance = response.rows[0].elements[0].distance.text;
      vm.duration = response.rows[0].elements[0].duration.text;
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    }


    vm.addField = function (obj) {
      var data = {
        _id: obj.originalObject._id,
        title: obj.originalObject.title,
        orignal_qty: obj.originalObject.quantity,
        price: obj.originalObject.price
      }
      vm.model.arr.push(data);
    };

    function submitEstimation(isValid) {
      vm.estimationSubmitted = true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.estimationForm');
        return false;
      }

      vm.estimationData.inventoryData = vm.model.arr;
      vm.estimationData.user = vm.jobDetail.user;
      vm.estimationData.technician = vm.jobDetail.technician;
      vm.estimationData.booking_id = vm.jobDetail._id;

      BookingsService.sendEstimation(vm.estimationData, function (res) {

        swal({
          title: 'Estimation Sent Successfully!',
          text: 'Estimation has been sent successfully, waiting for client approval.',
          icon: 'success',
          closeOnClickOutside: false,
        }, function () {

          jQuery(".modal").modal('hide');
          $state.go('book.ongoingJobs');
        });

      });
    }
  }
}());
