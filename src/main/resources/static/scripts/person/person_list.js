$(document).ready(function () {

    SN.person = {
        clear: function () {
            SN.errorDisplay.hide("#errorsDiv");
            $("#successDiv").hide();
        },
        deleteRecord: function (personId) {
            SN.person.clear();

            SN.ajaxHelper.makeCall("/person/delete/" + personId, "DELETE", {}, function (response) {
                $('#personRow' + personId).remove();
            });
        },

        addRow: function (record) {
            var personId = record.personId;
            var fullName = record.fullName;
            var gender = record.gender.description;

            var actionCell = SN.dom.obtainActionCell("/persons/edit/", personId);

            $("#listBody").append("<tr id='personRow" + personId + "'>"
                + actionCell
                + "<td><a href=\"/persons/view/" + personId + "\">" + fullName + "</a></td>"
                + "<td>" + gender + "</td>"
                + "</tr>"
            );
        },

        fetchList: function (requestData) {
            SN.ajaxHelper.makeCall("/person/list", "GET", requestData, function (response) {
                if (requestData.pageNumber) {
                    $("#" + "values" + "CurrentPage").val(requestData.pageNumber);
                }

                $("#listBody").html("");

                _.each(response.records, function (record) {
                    SN.person.addRow(record);
                });

                $(".deleteRecord").off().on("click", function () {
                    var personId = this.dataset.id;
                    bootbox.confirm("Are you sure you want to delete this record?", function (result) {
                        if (result == true) {
                            SN.person.deleteRecord(personId);
                        }
                    });
                });
            });

        }
    };

    SN.person.fetchList({});

    $("#valuesFirstLink").click(function () {
        var params = getListParamsOnPageAction("values", "first");
        SN.person.fetchList(params);
    });

    $("#valuesPreviousLink").click(function () {
        var params = getListParamsOnPageAction("values", "prev");
        SN.person.fetchList(params);
    });

    $("#valuesNextLink").click(function () {
        var params = getListParamsOnPageAction("values", "next");
        SN.person.fetchList(params);
    });

    $("#valuesLastLink").click(function () {
        var params = getListParamsOnPageAction("values", "last");
        SN.person.fetchList(params);
    });

    function Params() {

    }

    function getListParams(entity, sortColumn) {
        var params = {
            pageNumber: parseInt($("#" + entity + "CurrentPage").val(), 10),
            sortColumn: $("#" + entity + "SortColumn").val(),
            sortOrder: $("#" + entity + "SortOrder").val()
        };

        if (sortColumn) {
            params.pageNumber = 0;
            if (params.sortColumn == sortColumn) {
                params.sortOrder = (params.sort_order == "asc") ? "desc" : "asc";
            }
            else {
                params.sortColumn = sortColumn;
                params.sortOrder = "asc";
            }
        }

        if (params.pageNumber == null) {
            params.pageNumber = 0;
        }

        return params;
    }

    function getListParamsOnPageAction(entity, pageAction) {
        var params = getListParams(entity);

        SN.console.log("params(before)=" + JSON.stringify(params));

        if (pageAction === "first") {
            params.pageNumber = 0;
        }
        else if (pageAction === "prev") {
            params.pageNumber = params.pageNumber - 1;
        }
        else if (pageAction === "next") {
            params.pageNumber = params.pageNumber + 1;
        }
        else if (pageAction === "last") {
            var recordCountField = $("#" + entity + "RecordCount");
            var pageSizeField = $("#" + entity + "PageSize");

            if (recordCountField && recordCountField.length && pageSizeField && pageSizeField.length) {
                var pageSize = pageSizeField.val();
                if (pageSize == 0) pageSize = 1;
                params.pageNumber = Math.floor(parseInt(recordCountField.val(), 10) / pageSize);
            }
            else {
                params.pageNumber = 1;
            }
        }

        if (params.pageNumber < 0) {
            params.pageNumber = 0;
        }

        SN.console.log("params(after)=" + JSON.stringify(params));

        return params;
    }

    function managePagingControls(list, entity, pageControls) {

        if (pageControls == undefined) {
            $("#" + entity + "FirstLink, #" + entity + "PreviousLink").toggle(!list.firstPage);
            $("#" + entity + "NextLink, #" + entity + "LastLink").toggle(!list.lastPage);
        }
        else {
            if (!list.firstPage) {
                $("#" + entity + "FirstLink, #" + entity + "PreviousLink").removeAttr("disabled");
            }
            else {
                $("#" + entity + "FirstLink, #" + entity + "PreviousLink").attr("disabled", "disabled");
            }
            if (!list.lastPage) {
                $("#" + entity + "NextLink, #" + entity + "LastLink").removeAttr("disabled");
            }
            else {
                $("#" + entity + "NextLink, #" + entity + "LastLink").attr("disabled", "disabled");
            }
        }

        var countDisplayDiv = $("#" + entity + "CountDisplay");
        countDisplayDiv.html("");

        $("#" + entity + "RecordCount").val(list.recordSize);
        $("#" + entity + "CurrentPage").val(list.currentPage);
        $("#" + entity + "SortColumn").val(list.sortColumn);
        $("#" + entity + "SortOrder").val(list.sortOrder);

        SN.console.log("list.pageCount=" + list.pageCount);

        if (list.recordSize && list.recordSize > 0) {
            var countDisplay = "Showing " + (list.startIndex + 1) + "-" + (list.endIndex) + " of " +
                list.recordSize + " records, Page " + (list.currentPage + 1) + " of " + list.pageCount;

            countDisplayDiv.html(countDisplay);
        }
        else {
            countDisplayDiv.html("No records found");
        }

    }

});