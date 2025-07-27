$(document).ready(function () {

    $("#errorsDiv").html($("#errorMessage").val());

    $("#loginBtn").click(function () {
        var data = {
            login: $("#login").val(),
            password: $("#password").val()
        };

        $.ajax({
                url: "/user/login",
                type: "POST",
                data: JSON.stringify(data)
            })
            .done(function (response) {
                if (response === true) {
                    window.location.href = "/dashboard";
                }
            })
            .fail(function (jqXHR, error, errorThrown) {
                SN.ajaxHelper.displayErrorResponse(jqXHR, error, errorThrown, "#errorsDiv");
            });
    });

    $("#cancelBtn").click(function () {
        SN.navigator.goHome();
    })

});