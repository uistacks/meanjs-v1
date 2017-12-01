(function () {
  'use strict';

  angular
    .module('bannerimages.admin')
    .controller('BannerimagesAdminController', BannerimagesAdminController);

  BannerimagesAdminController.$inject = ['$scope', '$state', '$window', 'bannerimageResolve', 'Authentication', 'Notification', 'Upload', '$timeout'];

  function BannerimagesAdminController($scope, $state, $window, bannerimage, Authentication, Notification, Upload, $timeout) {
    var vm = this;

    vm.bannerimage = bannerimage;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.progress = 0;
    vm.fileSelected = 0;

    vm.upload = function (isValid, dataUrl) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bannerimageForm');
        return false;
      }

      if (dataUrl) {
        Upload.upload({
          url: '/api/bannerimages',
          data: {
            imgFile: dataUrl,
            caption: vm.bannerimage.caption,
            description: vm.bannerimage.description,
            bannerImgId: (vm.bannerimage._id) ? vm.bannerimage._id : ''
          }
        }).then(function (response) {
          $timeout(function () {
            onSuccessItem(response.data);
          });
        }, function (response) {
          if (response.status > 0) onErrorItem(response.data);
        }, function (evt) {
          vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
        });
      } else if (vm.bannerimage._id) {
        vm.bannerimage.createOrUpdate()
          .then(successCallback)
          .catch(errorCallback);
      } else {
        alert('Please select an image');
      }

      function successCallback(res) {
        $state.go('admin.bannerimages.list'); // should we send the User to the list or the updated Bannerimage's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Bannerimage saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Bannerimage save error!' });
      }

    };

    function onSuccessItem(theData) {
      $state.go('admin.bannerimages.list'); // should we send the User to the list or the updated Bannerimage's view?
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Banner image saved successfully!' });
    }

    function onErrorItem(theData) {
      Notification.error({ message: theData.message, title: '<i class="glyphicon glyphicon-remove"></i> Banner Image save error!' });
    }

    // Remove existing Bannerimage
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.bannerimage.$remove(function() {
          $state.go('admin.bannerimages.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Bannerimage deleted successfully!' });
        });
      }
    }

    // Save Bannerimage
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bannerimageForm');
        return false;
      }
      // Create a new bannerimage, or update the current instance
      vm.bannerimage.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.bannerimages.list'); // should we send the User to the list or the updated Bannerimage's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Bannerimage saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Bannerimage save error!' });
      }
    }
  }
}());
