$(document).ready(function () {

    SN.entity = {
        clear: function () {
            SN.errorDisplay.hide("#errorsDiv");
            $("#successDiv").hide();
        },
        deleteRecord: function (entityId) {
            SN.entity.clear();

            SN.ajaxHelper.makeCall("/entity/delete/" + entityId, "DELETE", {}, function (response) {
                $('#entityRow' + entityId).remove();
            });
        },

        addRow: function (record) {
            var entityId = record.entityId;
            var entityName = _.escape(record.name);
            var entityAbbrev = _.escape(record.abbreviation);
            var entityDesc = _.escape(record.description);

            var actionCell = SN.dom.obtainActionCell('/entities/edit/', entityId);

            $("#teamsListBody").append("<tr id='entityRow" + entityId + "'>"
                + actionCell
                + "<td><a href=\"/entities/view/" + entityId + "\">" + entityName + "</a></td>"
                + "<td>" + entityAbbrev + "</td>"
                + "<td>" + entityDesc + "</td>"
                + "</tr>"
            );
        },

        fetchList: function (requestData) {
            //Request data currently not being used

            SN.ajaxHelper.makeCall("/entity/list", "GET", {}, function (response) {
                $("#teamsListBody").html("");

                _.each(response, function (record) {
                    SN.entity.addRow(record);
                });

                $(".deleteRecord").off().on("click", function () {
                    var entityId = this.dataset.id;
                    bootbox.confirm("Are you sure you want to delete this record?", function (result) {
                        if (result == true) {
                            SN.entity.deleteRecord(entityId);
                        }
                    });
                });
            });
        }
    };

    SN.entity.fetchList({});

});