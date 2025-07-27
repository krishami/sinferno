$(document).ready(function () {

    SN.event = {
        TABLE_BODY: "eventBody",
        ROW_PREFIX: "eventRow",
        ERRORS_SECTION: "errorsDiv",

        deleteRecord: function (eventId) {
            var onSuccess = function (response) {
                $("#" + SN.event.ROW_PREFIX + eventId).remove();
            };

            var onFailure = function (jqXHR, error, errorThrown) {
                SN.ajaxHelper.displayErrorResponse(jqXHR, error, errorThrown, "#" + SN.event.ERRORS_SECTION);
            };

            SN.eventController.delete(eventId, onSuccess, onFailure);
        },

        addRow: function (record) {
            var eventId = record.eventId;
            var eventName = _.escape(record.name);
            var eventType = _.escape(record.eventType.description);
            var sportsType = _.escape(record.sportsType.description) + " (" +
                _.escape(record.sportsSubType.description) + ")";

            //Dates should be stripped of time from the backend if so desired
            var startDate = _.escape(record.startDate);
            var endDate = _.escape(record.endDate);

            var actionCell = SN.dom.obtainActionCell('/events/edit/', eventId);

            $("#" + SN.event.TABLE_BODY).append(
                "<tr id='" + SN.event.ROW_PREFIX + eventId + "'>"
                + actionCell
                + "<td><a href=\"/events/view/" + eventId + "\">" + eventName + "</a></td>"
                + "<td>" + eventType + "</td>"
                + "<td>" + sportsType + "</td>"
                + "<td>" + startDate + "</td>"
                + "<td>" + endDate + "</td>"
                + "</tr>"
            );
        },

        fetchList: function (requestData) {
            var onSuccess = function (response) {
                $("#" + SN.event.TABLE_BODY).html("");

                //SN.console.log(JSON.stringify(response));

                _.each(response, function (record) {
                    SN.event.addRow(record);
                });

                $(".deleteRecord").off().on("click", function () {
                    var recordId = this.dataset.id;
                    bootbox.confirm("Are you sure you want to delete this record?", function (result) {
                        if (result == true) {
                            SN.event.deleteRecord(recordId);
                        }
                    });
                });

            };
            var onFailure = function (jqXHR, error, errorThrown) {
                SN.ajaxHelper.displayErrorResponse(jqXHR, error, errorThrown, "#" + SN.event.ERRORS_SECTION);
            };

            SN.eventController.listTopLevelEvents(onSuccess, onFailure);
        }
    };

    SN.event.fetchList({});

});