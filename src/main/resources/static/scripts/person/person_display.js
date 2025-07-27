$(document).ready(function () {

    var personId = $("#personId").val();

    SN.ajaxHelper.makeCall("/person/single/" + personId, "GET", {}, function (response) {
        $("#fullName").html(_.escape(response.fullName));
        $("#gender").html(_.escape(response.gender.description));
        $("#entityOwner").html(_.escape(response.owner.fullName));
    });

});