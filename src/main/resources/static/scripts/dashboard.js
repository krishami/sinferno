$(document).ready(function () {
    SN.dashboard = {
        ERRORS_SECTION: "errorsDiv",

        fetchList: function (requestData, fetchUrl, viewUrl, displayField, idColumn, nameColumn, callback) {
            SN.ajaxHelper.makeCall(fetchUrl, "GET", {},
                function (response) {
                    callback(response, viewUrl, displayField, idColumn, nameColumn);
                },
                function (jqXHR, error, errorThrown) {
                    SN.ajaxHelper.displayErrorResponse(jqXHR, error, errorThrown, "#" + SN.dashboard.ERRORS_SECTION);
                }
            );
        }
    };

    var displayList = function (response, viewUrl, displayField, idColumn, nameColumn) {
        if (response.records) {
            response = response.records;
        }

        $(displayField).html("");

        //TODO: May want to have this "5" sent as part of the request so we don't get so much data back
        _.each(_.first(response, 5), function (record) {
            $(displayField).append(
                '<tr><td><a href="' + viewUrl + record[idColumn] + '">' + _.escape(record[nameColumn]) + '</a></td></tr>'
            );

        });

    };

    //TODO: These are not the most recent. You will need to add endpoints for that to be called

    SN.dashboard.fetchList({}, "/event/top_level", "/events/view/", "#eventBody", "eventId", "name", displayList);
    SN.dashboard.fetchList({}, "/person/list", "/persons/view/", "#personBody", "personId", "fullName", displayList);
    SN.dashboard.fetchList({}, "/entity/list", "/entities/view/", "#entityBody", "entityId", "name", displayList);
    SN.dashboard.fetchList({}, "/venue/list", "/venues/view/", "#venueBody", "venueId", "name", displayList);

});