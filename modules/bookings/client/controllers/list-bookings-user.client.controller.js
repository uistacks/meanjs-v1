(function () {
  'use strict';

  angular
    .module('bookings')
    .controller('BookingsUserListController', BookingsUserListController);

  BookingsUserListController.$inject = ['$scope', '$state', 'BookingsService', 'Notification'];

  function BookingsUserListController($scope, $state, BookingsService, Notification) {
    var vm = this;
    vm.estimationDetail = {};
    vm.ongoing_jobs = BookingsService.getUserOngoingJobs();
    vm.completed_jobs = BookingsService.getUserCompletedJobs();
    vm.showEstimation = showEstimation;
    vm.showRejectEstimationPopup = showRejectEstimationPopup;
    vm.acceptEstimation = acceptEstimation;
    vm.estimationData;
    vm.additional = [];
    vm.estimationSubmitted = false;
    vm.submitRejectEstimation = submitRejectEstimation;
    vm.rejectAdditionalEstimation = rejectAdditionalEstimation;
    vm.acceptAdditionalEstimation = acceptAdditionalEstimation;
    vm.jobCompleted = jobCompleted;
    vm.jobIncomplete = jobIncomplete;
    vm.jobPaid = jobPaid;

    function showEstimation(booking_id) {
      BookingsService.getEstimation({booking_id: booking_id}, function (res) {
        vm.additional = res.additional;
        vm.estimationDetail = res.estimation;
        jQuery("#view_estimation_popup").appendTo('body').modal('show');
      });
    }

    function showRejectEstimationPopup() {

      jQuery(".modal").modal('hide');
      jQuery("#reject_estimation_popup").appendTo("body").modal('show');
    }

    function acceptEstimation() {
      if (!confirm("Are you sure to accept this estimation?")) {
        return false;
      }

      var data = {estimation_id: vm.estimationDetail._id};

      BookingsService.acceptEstimation(data, function (result) {
        vm.ongoing_jobs = BookingsService.getUserOngoingJobs();

        jQuery(".modal").modal('hide');

        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Estimation has been accepted successfully!',
          title: 'Success!!!',
          delay: 3000
        });
      });
    }


    function submitRejectEstimation(isValid) {
      vm.estimationSubmitted = true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.estimationForm');
        return false;
      }
      vm.estimationData.estimation_id = vm.estimationDetail._id;
      BookingsService.submitRejectEstimation(vm.estimationData, function (res) {
        vm.ongoing_jobs = BookingsService.getUserOngoingJobs();
        jQuery(".modal").modal('hide');

        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Estimation has been rejected successfully!',
          title: 'Success!!!',
          delay: 3000
        });
      });

    }

    function rejectAdditionalEstimation(additionalId) {
      if (!confirm('Are you sure to reject this request?')) {
        return;
      }
      var data = {additionalId: additionalId};
      BookingsService.rejectAdditionalEstimation(data, function (result) {
        vm.ongoing_jobs = BookingsService.getUserOngoingJobs();
        jQuery(".modal").modal('hide');
        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Additional hours estimation has been rejected successfully!',
          title: 'Success!!!',
          delay: 3000
        });
      });
    }

    function acceptAdditionalEstimation(additionalId) {
      if (!confirm('Are you sure to accept this request?')) {
        return;
      }
      var data = {additionalId: additionalId};
      BookingsService.acceptAdditionalEstimation(data, function (result) {
        vm.ongoing_jobs = BookingsService.getUserOngoingJobs();
        jQuery(".modal").modal('hide');
        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Additional hours estimation has been accepted successfully!',
          title: 'Success!!!',
          delay: 3000
        });
      });
    }

    function jobCompleted(bookingId) {
      if (!confirm('Are you sure to set this service as completed?')) {
        return;
      }
      BookingsService.changeBookingStatus({ status: 'custcompleted', job_id: bookingId }, function (res) {
        vm.ongoing_jobs = BookingsService.getUserOngoingJobs();
        swal({
          title: 'Service completed successfully!',
          icon: 'success',
          closeOnClickOutside: true,
        });
      });
    }

    function jobIncomplete(bookingId) {
      if (!confirm('Are you sure to set this service as incomplete?')) {
        return;
      }
      BookingsService.changeBookingStatus({ status: 'incomplete', job_id: bookingId }, function (res) {
        vm.ongoing_jobs = BookingsService.getUserOngoingJobs();
        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Service marked as incomplete successfully!',
          title: 'Success!!!',
          delay: 3000
        });
      });
    }
    function jobPaid(bookingId) {
      BookingsService.changeBookingStatus({ status: 'custpaid', job_id: bookingId }, function (res) {
        vm.ongoing_jobs = BookingsService.getUserOngoingJobs();
        Notification.success({
          message: '<i class="glyphicon glyphicon-ok"></i> Service marked as paid successfully!',
          title: 'Success!!!',
          delay: 3000
        });
      });
    }
  }
}());
