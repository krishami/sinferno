$(document).ready(function () {

    SN.ajaxHelper.makeCall("/person/add", "GET", {}, function (response) {
        SN.dom.populateSelectizeDropdowns(
            [{field: "#gender", values: response.genders}]
        );
    });

    $("#saveBtn").click(function () {
        var data = PersonFormModel();
        var view = PersonFormView();

        view.clear();

        SN.ajaxHelper.makeCall("/person/save", "POST", JSON.stringify(data), function (response) {
            SN.navigator.goPersonHome();
        });

    });

    $("#cancelBtn").click(function () {
        SN.navigator.goPersonHome();
    });

    var PersonFormModel = function () {
        return {
            fullName: $("#fullName").val(),
            gender: SN.dom.getSelectizeDropdownValue("#gender")
        };
    };

    var PersonFormView = SN.standardFormView;

});