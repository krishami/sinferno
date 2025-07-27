$(document).ready(function () {
    var entityId = $("#entityId").val();

    SN.ajaxHelper.makeCall("/entity/edit/" + entityId, "GET", {}, function (response) {
        $("#name").val(response.name);
        $("#abbreviation").val(response.abbreviation);
        $("#description").val(response.description);
    });

    $("#saveBtn").click(function () {
        var data = EntityFormModel();

        SN.console.log("Sending data: " + JSON.stringify(data));
        var view = EntityFormView();
        view.clear();

        SN.ajaxHelper.makeCall("/entity/update", "POST", JSON.stringify(data), function (response) {
            SN.navigator.goEntityHome();
        });

    });

    $("#cancelBtn").click(function () {
        SN.navigator.goEntityHome();
    });

    var EntityFormModel = function () {
        return {
            entityId: $("#entityId").val(),
            name: $("#name").val(),
            abbreviation: $("#abbreviation").val(),
            description: $("#description").val()
        };
    };

    var EntityFormView = SN.standardFormView;

});

