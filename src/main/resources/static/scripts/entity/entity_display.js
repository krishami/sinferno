$(document).ready(function () {
    var entityId = $("#entityId").val();

    SN.ajaxHelper.makeCall("/entity/single/" + entityId, "GET", {}, function (response) {
        $("#entityName").html(_.escape(response.name));
        $("#entityAbbrev").html(_.escape(response.abbreviation));
        $("#entityDesc").html(_.escape(response.description));
        $("#entityOwner").html(_.escape(response.owner.fullName));

        //_.each(response.associatedPersons, function(associatedPerson) {
        //    for (var i = 0; i < associatedPerson.length; i++) {
        //        $("#associatedPlayers").append(associatedPerson[i].fullName + "<br/>");
        //    }
        //});

        //TODO: Test this
        _.each(response.associatedPersons, function(associatedPerson) {
            for (var i = 0; i < associatedPerson.length; i++) {
                $("#associatedPlayers").append(associatedPerson[i].fullName + "<br/>");
            }
        });

        // for (var p in response.associatedPersons) {
        //     var associatedPerson = response.associatedPersons[p];
        //     for (var i = 0; i < associatedPerson.length; i++) {
        //         $("#associatedPlayers").append(associatedPerson[i].fullName + "<br/>");
        //     }
        // }
    });

});