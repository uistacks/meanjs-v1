(function () {
  'use strict';

  angular
    .module('bookings')
    .controller('BookingsListController', BookingsListController);

  BookingsListController.$inject = ['$state' ,'$scope', '$filter', 'BookingsService', 'InventoriesService', 'Notification'];

  function BookingsListController($state, $scope, $filter, BookingsService, InventoriesService, Notification) {
    var vm = this;
    vm.estimationDetail = {};
    vm.ongoing_jobs = BookingsService.getTechOngoingJobs();
    vm.completed_jobs = BookingsService.getTechCompletedJobs();
    vm.showEstimation = showEstimation;
    vm.submitAdditionalHours = submitAdditionalHours;
    vm.estimationSubmitted = false;
    vm.inventories = {};
    vm.SelectedInventories = [];
    vm.model = { 'arr': [] };
    vm.estimationData;
    vm.additional = [];
    vm.bookingDetail = {};
    vm.raiseInvoice = raiseInvoice;
    vm.paidApprove = paidApprove;
    vm.paidReject = paidReject;
    vm.jobAccept = jobAccept;
    vm.jobReject = jobReject;


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

    function showEstimation(booking_id) {
      BookingsService.getEstimation({ booking_id: booking_id }, function(res) {

        console.log(res.additional.length);
        vm.additional = res.additional;
        vm.estimationDetail = res.estimation;

        vm.bookingDetail = $filter('filter')(vm.ongoing_jobs, { '_id': vm.estimationDetail.booking_id });
        jQuery("#view_estimation_popup").appendTo('body').modal('show');

        console.log(vm.bookingDetail[0].servicetype);
        var inventoryParam = {
          servicetype: vm.bookingDetail[0].servicetype,
          area: vm.bookingDetail[0].area,
        };

        InventoriesService.getTechInventories(inventoryParam, function (res) {
          vm.inventories = res;
        });
      });
    }

    vm.addField = function(obj) {
      var data = {
        _id: obj.originalObject._id,
        title: obj.originalObject.title,
        orignal_qty: obj.originalObject.quantity,
        price: obj.originalObject.price
      }
      vm.model.arr.push(data);
    };

    vm.clearInput = function (id) {
      $scope.$broadcast('angucomplete-alt:clearInput');
    }

    function submitAdditionalHours(isValid) {

      vm.estimationSubmitted = true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.estimationForm');
        return false;
      }
      vm.estimationData.inventoryData = vm.model.arr;
      vm.estimationData.user = vm.bookingDetail[0].user._id;
      vm.estimationData.technician = vm.bookingDetail[0].technician;
      vm.estimationData.booking_id = vm.bookingDetail[0]._id;
      vm.estimationData.estimation_id = vm.estimationDetail._id;


      BookingsService.submitAdditionalHours(vm.estimationData, function(res){

        swal({
          title: 'Additional hours estimation has been sent successfully!',
          text: 'Additional hours estimation has been sent successfully, waiting for client approval.',
          icon: 'success',
          closeOnClickOutside: true,
        }, function () {
          jQuery(".modal").modal('hide');
          vm.ongoing_jobs = BookingsService.getTechOngoingJobs();
          $state.go('book.ongoingJobs');
        });

      });
    }

    function raiseInvoice(bookingId) {
      BookingsService.changeBookingStatus({ status: 'invoice', job_id: bookingId }, function (res) {
        vm.ongoing_jobs = BookingsService.getTechOngoingJobs();
        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Invoice raised successfully!',
          title: 'Success!!!',
          delay: 3000
        });
      });
    }

    function paidApprove(bookingId) {
      BookingsService.changeBookingStatus({ status: 'completed', job_id: bookingId }, function (res) {
        vm.ongoing_jobs = BookingsService.getTechOngoingJobs();
        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Approved successfully!',
          title: 'Success!!!',
          delay: 3000
        });
      });
    }

    function jobAccept(bookingId) {
      if (!confirm("Are you sure to accept this job request?")) {
        return false;
      }
      BookingsService.changeBookingStatus({ status: 'accepted', job_id: bookingId }, function (res) {
        vm.ongoing_jobs = BookingsService.getTechOngoingJobs();
        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Job has been accepted successfully!',
          title: 'Success!!!',
          delay: 3000
        });
      });
    }

    function jobReject(bookingId) {
      if (!confirm("Are you sure to reject this job request?")) {
        return false;
      }
      BookingsService.changeBookingStatus({ status: 'rejected', job_id: bookingId }, function (res) {
        vm.ongoing_jobs = BookingsService.getTechOngoingJobs();
        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Job has been rejected successfully!',
          title: 'Success!!!',
          delay: 3000
        });
      });
    }

    function paidReject(bookingId) {
      BookingsService.changeBookingStatus({status: 'paidrejected', job_id: bookingId}, function (res) {
        vm.ongoing_jobs = BookingsService.getTechOngoingJobs();
        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Paid Rejected!',
          title: 'Success!!!',
          delay: 3000
        });
      });
    }
  }
}());
