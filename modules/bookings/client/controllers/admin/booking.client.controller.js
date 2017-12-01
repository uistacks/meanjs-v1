(function () {
  'use strict';

  angular
    .module('bookings.admin')
    .controller('BookingsAdminController', BookingsAdminController);

  BookingsAdminController.$inject = ['$scope', '$state', '$window', 'bookingResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi'];

  function BookingsAdminController($scope, $state, $window, booking, Authentication, Notification, uiGmapGoogleMapApi) {
    var vm = this;

    vm.booking = booking;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.map = { center: { latitude: 23.5392453, longitude: 45.4938145 }, zoom: 7 };
    $scope.bookingLatLangs = [];
    $scope.polygonData = {};
    $scope.currentOverlay = {};

    if (booking._id) {
      $scope.bookingLatLangs = booking.content.coordinates[0];

      $scope.polygonData.id = 1;
      $scope.polygonData.path = [];
      $scope.polygonData.editable = false;
      $scope.polygonData.draggable = false;
      $scope.polygonData.geodesic = false;
      $scope.polygonData.visible = true;


      booking.content.coordinates[0].forEach(function(element) {
        $scope.polygonData.path.push({ latitude: element[0], longitude: element[1] });
      });

    }

    $scope.clearPath = function () {
      $scope.polygonData.path = [];
      if ($scope.currentOverlay.setMap) {
        $scope.currentOverlay.setMap(null);
      }

    };

    $scope.searchbox = {
      template: '/searchbox.tpl.html',
      events: {
        places_changed: function (searchBox) {

          var arrPlaces = searchBox.getPlaces();
          arrPlaces.forEach(function(element) {
            $scope.drawingManagerControl.getDrawingManager().map.setCenter({ lat: element.geometry.location.lat(), lng: element.geometry.location.lng() });
          });
        }
      }
    };
    uiGmapGoogleMapApi.then(function(maps) {
      $scope.drawingManagerOptions = {
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          position: maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            maps.drawing.OverlayType.POLYGON
          ]
        }
      };

      $scope.drawingEvents = {
        overlaycomplete: $scope.drawComplete,
        drawingmode_changed: $scope.clearPath
      };

    });

    $scope.drawComplete = function (evt, evt2, evt3, overlayEvent) {

      if (overlayEvent.length) {
        $scope.drawingManagerControl.getDrawingManager().setOptions({ drawingMode: null });
        var overLayData = overlayEvent[0].overlay.getPath().getArray();
        $scope.currentOverlay = overlayEvent[0].overlay;
        var bookingData = [];
        overLayData.forEach(function (element) {
          var objLatLng = element;
          bookingData.push([objLatLng.lat(), objLatLng.lng()]);
        });

        bookingData.push(bookingData[0]); // Work around to get first value

        $scope.bookingLatLangs = [bookingData];

      }
    };

    $scope.drawingManagerControl = {};

    // Remove existing Booking
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.booking.$remove(function() {
          $state.go('admin.bookings.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Booking deleted successfully!' });
        });
      }
    }

    // Save Booking
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookingForm');
        return false;
      }

      if ($scope.bookingLatLangs.length < 1) {
        Notification.error({ message: 'Please draw booking co-ordinates to define the booking', title: '<i class="glyphicon glyphicon-remove"></i> No Booking Co-Ordinates' });
        return false;
      } else {
        vm.booking.content = $scope.bookingLatLangs;
      }

      // Create a new booking, or update the current instance
      vm.booking.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.bookings.list'); // should we send the User to the list or the updated Booking's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Booking saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Booking save error!' });
      }
    }
  }
}());
