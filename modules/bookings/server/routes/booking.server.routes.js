'use strict';

/**
 * Module dependencies
 */
var bookingsPolicy = require('../policies/bookings.server.policy'),
        bookings = require('../controllers/bookings.server.controller');

module.exports = function (app) {
    // Bookings collection routes
    app.route('/api/bookings').all(bookingsPolicy.isAllowed)
            .get(bookings.list)
            .post(bookings.create);

    // Single booking routes
    app.route('/api/bookings/:bookingId').all(bookingsPolicy.isAllowed)
            .get(bookings.read)
            .put(bookings.update)
            .delete(bookings.delete);


    app.route('/api/user/booking/detail').all(bookingsPolicy.isAllowed)
            .post(bookings.getUserBooking);

    app.route('/api/booking/get-user-service-booking')
            .post(bookings.getUserServiceBooking);

    app.route('/api/booking/book-service')
            .post(bookings.bookService);


    app.route('/api/booking/get-tech-ongoing-job')
            .post(bookings.getTechOngoingJobs);

    app.route('/api/booking/get-user-ongoing-job')
            .post(bookings.getUserOngoingJobs);

    app.route('/api/booking/get-tech-completed-job')
            .post(bookings.getTechCompletedJobs);

    app.route('/api/booking/get-user-completed-job')
            .post(bookings.getUserCompletedJobs);

    app.route('/api/booking/get-job-detail')
            .post(bookings.getJobDetail);

    app.route('/api/booking/change-status')
            .post(bookings.changeBookingStatus);
    app.route('/api/booking/send-estimation')
            .post(bookings.sendEstimation);
    app.route('/api/booking/get-estimation')
            .post(bookings.getEstimation);

    app.route('/api/booking/submit-reject-estimation')
            .post(bookings.submitRejectEstimation);

    app.route('/api/booking/submit-accept-estimation')
            .post(bookings.submitAcceptEstimation);
  app.route('/api/booking/submit-additional-hours')
    .post(bookings.submitAdditionalHours);

  app.route('/api/booking/reject-additional-hours')
    .post(bookings.rejectAdditionalEstimation);

  app.route('/api/booking/accept-additional-hours')
    .post(bookings.acceptAdditionalEstimation);

    // Finish by binding the booking middleware
    app.param('bookingId', bookings.bookingByID);
};
