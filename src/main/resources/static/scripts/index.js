$(document).ready(function () {
    var loginOperation = function () {
        var data = {
            login: $("#login").val(),
            password: $("#password").val()
        };

        SN.ajaxHelper.makeCall("/user/login", "POST", JSON.stringify(data), function (response) {
            if (response === true) {
                window.location.href = "/dashboard";
            }
        });

    };

    $("#loginBtn").click(loginOperation);

    $("#password").keypress(function (e) {
        if (e.which == '13') {
            loginOperation();
        }
    });

});