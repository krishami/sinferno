$(document).ready(function () {

    SN.venue = {
        clear: function () {
            SN.errorDisplay.hide("#errorsDiv");
            $("#successDiv").hide();
        },
        deleteRecord: function (venueId) {
            SN.venue.clear();

            var onSuccess = function (response) {
                $('#venueRow' + venueId).remove();
            };

            var onFailure = function (jqXHR, error, errorThrown) {
                SN.ajaxHelper.displayErrorResponse(jqXHR, error, errorThrown, "#errorsDiv");
            };

            SN.ajaxHelper.makeCall("/venue/delete/" + venueId, "DELETE", {}, onSuccess, onFailure);
        },

        addRow: function (record) {
            var venueId = record.venueId;
            var venueName = _.escape(record.name);
            var venueDesc = _.escape(record.description);

            var actionCell = SN.dom.obtainActionCell('/venues/edit/', venueId);

            $("#venuesListBody").append("<tr id='venueRow" + venueId + "'>"
                + actionCell
                + "<td><a href=\"/venues/view/" + venueId + "\">" + venueName + "</a></td>"
                + "<td>" + venueDesc + "</td>"
                + "</tr>"
            );
        },

        fetchList: function (requestData) {
            //Request data currently not being used
            var onSuccess = function (response) {
                $("#venuesListBody").html("");

                _.each(response, function (record) {
                    SN.venue.addRow(record);
                });

                $(".deleteRecord").off().on("click", function () {
                    var venueId = this.dataset.id;
                    bootbox.confirm("Are you sure you want to delete this record?", function (result) {
                        if (result == true) {
                            SN.venue.deleteRecord(venueId);
                        }
                    });
                });

            };
            var onFailure = function (jqXHR, error, errorThrown) {
                SN.ajaxHelper.displayErrorResponse(jqXHR, error, errorThrown, "#errorsDiv");
            };

            SN.ajaxHelper.makeCall("/venue/list", "GET", {}, onSuccess, onFailure);
        }
    };

    SN.venue.fetchList({});

});