$(document).ready(function () {

    $("#saveBtn").click(function () {
        var data = RegistrationFormModel();
        var view = RegistrationFormView();

        view.clear();

        SN.ajaxHelper.makeCall("/user/register", "POST", JSON.stringify(data), function (response) {
            SN.navigator.goHome();
        });

    });

    $("#cancelBtn").click(function () {
        SN.navigator.goHome();
    });

    //We do not have timezone as a dropdown because
    //we want to avoid users from having to fill out
    //a field that could be confusing - More sign ups!
    //Once they become a user, they can always change it
    var RegistrationFormModel = function () {
        return {
            fullName: $("#fullName").val(),
            email: $("#email").val(),
            login: $("#login").val(),
            password: $("#password").val(),
            rePassword: $("#rePassword").val(),
            terms: SN.dom.isChecked("#terms"),
            timezone: $("#timezone").val()
        };
    };

    var RegistrationFormView = SN.standardFormView;

    $("#timezone").val(jstz.determine().name());

});