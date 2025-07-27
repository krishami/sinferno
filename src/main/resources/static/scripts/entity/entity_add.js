$(document).ready(function () {

    SN.ajaxHelper.makeCall("/entity/add", "GET", {}, function (response) {
        SN.console.log(JSON.stringify(response));
    });

    $("#saveBtn").click(function () {
        var data = EntityFormModel();
        var view = EntityFormView();

        view.clear();

        SN.ajaxHelper.makeCall("/entity/save", "POST", JSON.stringify(data), function (response) {
            SN.navigator.goEntityHome();
        });

    });

    $("#cancelBtn").click(function () {
        SN.navigator.goEntityHome();
    });

    var EntityFormModel = function () {
        return {
            name: $("#name").val(),
            abbreviation: $("#abbreviation").val(),
            description: $("#description").val()
        };
    };

    var EntityFormView = SN.standardFormView;

});