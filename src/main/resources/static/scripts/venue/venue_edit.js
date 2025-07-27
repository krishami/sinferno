$(document).ready(function () {
    var venueId = $("#venueId").val();

    SN.ajaxHelper.makeCall("/venue/edit/" + venueId, "GET", {}, function (response) {
        $("#name").val(response.name);
        $("#description").val(response.description);
        $("#address1").val(response.address1);
        $("#address2").val(response.address2);
        $("#city").val(response.city);
        $("#state").val(response.state);
        $("#postalCode").val(response.postalCode);

        SN.dom.populateSelectizeDropdowns(
            [
                {field: "#country", values: response.countries, defaultValue: response.country},
                {field: "#timezone", values: response.timezones, defaultValue: response.timezone}
            ]
        );
    });

    $("#saveBtn").click(function () {
        var data = VenueFormModel();
        var view = VenueFormView();
        view.clear();

        SN.ajaxHelper.makeCall("/venue/update", "POST", JSON.stringify(data), function (response) {
            var $successDiv = $("#successDiv");
            $successDiv.show();
            $successDiv.html("Saved Successfully.");

            setTimeout(function () {
                SN.navigator.goVenueHome();
            }, 2000);
        });

    });

    $("#cancelBtn").click(function () {
        SN.navigator.goVenueHome();
    });

    var VenueFormModel = function () {
        return {
            venueId: $("#venueId").val(),
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

