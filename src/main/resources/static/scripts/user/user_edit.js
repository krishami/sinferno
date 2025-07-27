$(document).ready(function () {
    SN.ajaxHelper.makeCall("/user/edit", "GET", {}, function (response) {
        $("#login").val(_.escape(response.loginName));
        $("#fullName").val(_.escape(response.fullName));
        $("#email").val(_.escape(response.email));

        SN.dom.populateSelectizeDropdowns(
            [
                {field: "#timezone", values: response.timezones, defaultValue: response.timezone}
            ]
        );
    });

    $("#saveBtn").click(function () {
        var data = MyAccountFormModel();
        var view = MyAccountFormView();

        view.clear();

        SN.ajaxHelper.makeCall("/user/update", "POST", JSON.stringify(data), function (response) {
            var $successDiv = $("#successDiv");
            $successDiv.show();
            $successDiv.html("Saved Successfully.");
        });

    });

    $("#cancelBtn").click(function () {
        SN.navigator.goDashboard();
    });

    var MyAccountFormModel = function () {
        return {
            fullName: $("#fullName").val(),
            email: $("#email").val(),
            oldPassword: $("#oldPassword").val(),
            password: $("#password").val(),
            rePassword: $("#rePassword").val(),
            timezone: SN.dom.getSelectizeDropdownValue("#timezone")
        };
    };

    var MyAccountFormView = SN.standardFormView;

});

