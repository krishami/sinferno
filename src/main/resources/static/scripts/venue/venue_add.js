$(document).ready(function () {

    SN.ajaxHelper.makeCall("/venue/add", "GET", {}, function (response) {
        SN.dom.populateSelectizeDropdowns(
            [
                {field: "#country", values: response.countries},
                {field: "#timezone", values: response.timezones, defaultValue: jstz.determine().name()}
            ]
        );
    });

    $("#saveBtn").click(function () {
        var data = VenueFormModel();
        var view = VenueFormView();

        view.clear();

        SN.ajaxHelper.makeCall("/venue/save", "POST", JSON.stringify(data), function (response) {
            SN.navigator.goVenueHome();
        });
    });

    $("#cancelBtn").click(function () {
        SN.navigator.goVenueHome();
    });

    var VenueFormModel = function () {
        return {
            name: $("#name").val(),
            description: $("#description").val(),
            address1: $("#address1").val(),
            address2: $("#address2").val(),
            city: $("#city").val(),
            state: $("#state").val(),
            postalCode: $("#postalCode").val(),
            country: SN.dom.getSelectizeDropdownValue("#country"),
            timezone: SN.dom.getSelectizeDropdownValue("#timezone")
        };
    };

    var VenueFormView = SN.standardFormView;

});