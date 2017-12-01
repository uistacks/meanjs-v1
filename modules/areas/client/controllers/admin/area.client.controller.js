(function () {
  'use strict';

  angular
    .module('areas.admin')
    .controller('AreasAdminController', AreasAdminController);

  AreasAdminController.$inject = ['$scope', '$state', '$window', 'areaResolve', 'Authentication', 'Notification', 'uiGmapGoogleMapApi'];

  function AreasAdminController($scope, $state, $window, area, Authentication, Notification, uiGmapGoogleMapApi) {
    var vm = this;

    vm.area = area;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.map = { center: { latitude: 23.5392453, longitude: 45.4938145 }, zoom: 7 };
    $scope.areaLatLangs = [];
    $scope.polygonData = {};
    $scope.currentOverlay = {};

    if (area._id) {
      $scope.areaLatLangs = area.content.coordinates[0];

      $scope.polygonData.id = 1;
      $scope.polygonData.path = [];
      $scope.polygonData.editable = false;
      $scope.polygonData.draggable = false;
      $scope.polygonData.geodesic = false;
      $scope.polygonData.visible = true;


      area.content.coordinates[0].forEach(function(element) {
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
        var areaData = [];
        overLayData.forEach(function (element) {
          var objLatLng = element;
          areaData.push([objLatLng.lat(), objLatLng.lng()]);
        });

        areaData.push(areaData[0]); // Work around to get first value

        $scope.areaLatLangs = [areaData];

      }
    };

    $scope.drawingManagerControl = {};

    // Remove existing Area
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.area.$remove(function() {
          $state.go('admin.areas.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Area deleted successfully!' });
        });
      }
    }

    // Save Area
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.areaForm');
        return false;
      }

      if ($scope.areaLatLangs.length < 1) {
        Notification.error({ message: 'Please draw area co-ordinates to define the area', title: '<i class="glyphicon glyphicon-remove"></i> No Area Co-Ordinates' });
        return false;
      } else {
        vm.area.content = $scope.areaLatLangs;

        console.log(vm.area.content);
      }

      // Create a new area, or update the current instance
      vm.area.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.areas.list'); // should we send the User to the list or the updated Area's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Area saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Area save error!' });
      }
    }
  }
}());
