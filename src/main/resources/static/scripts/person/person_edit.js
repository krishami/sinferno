$(document).ready(function () {

    var personId = $("#personId").val();

    SN.ajaxHelper.makeCall("/person/edit/" + personId, "GET", {}, function (response) {
        $("#fullName").val(response.fullName);

        SN.dom.populateSelectizeDropdowns(
            [{field: "#gender", values: response.genders, defaultValue: response.gender}]
        );
    });

    $("#saveBtn").click(function () {
        var data = PersonFormModel();

        SN.console.log("Sending data: " + JSON.stringify(data));
        var view = PersonFormView();
        view.clear();

        SN.ajaxHelper.makeCall("/person/update", "POST", JSON.stringify(data), function (response) {
            SN.console.log("Response=" + JSON.stringify(response));
            var $successDiv = $("#successDiv");
            $successDiv.show();
            $successDiv.html("Saved Successfully.");

            setTimeout(function () {
                SN.navigator.goPersonHome();
            }, 2000);
        });

    });

    $("#cancelBtn").click(function () {
        SN.navigator.goPersonHome();
    });

    var PersonFormModel = function () {
        return {
            personId: $("#personId").val(),
            fullName: $("#fullName").val(),
            gender: SN.dom.getSelectizeDropdownValue("#gender")
        };
    };

    var PersonFormView = SN.standardFormView;

});

