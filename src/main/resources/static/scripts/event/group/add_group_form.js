//It is clear that for a group, we have to choose rank
//And for a match, we have to choose winner
//The UI should adjust and sends back the right thing

//Override handleCustomEvents to handle the situation when the user selects the team versus event
//and so we would have to deal with the team selected event
//
//We may need a custom event to handle automatic points calculation based on rules

SN.BaseAddEventGroupForm = {};

SN.BaseAddEventGroupForm.create = function (groupController) {
    var form = SN.BaseGroupForm.create();

    form.getValues = function (data, groupEventId) {
        return [
            {field: form.EVENT_ID, value: groupEventId },
            {field: form.TEAM_ID, values: data.entities, value: ""}
        ];
    };

    form.handleCustomEvents = function (model) {
        //No custom events to be handled
    };

    form.open = function(groupEventId, rootEvent, groupEvent) {

        SN.binaryGroupController.addUnderEvent(groupEventId, function(data) {
            SN.console.logObject(data);

            var heading = "Add Team to " + groupEvent.name;

            SN.dom.toggleFieldView(form.getField(form.ABANDONED), false);
            SN.dom.toggleFieldView(form.getField(form.RUNS_FOR), false);
            SN.dom.toggleFieldView(form.getField(form.RUNS_AGAINST), false);

            var values = form.getValues(data, groupEventId);

            form.populate(values);

            SN.eventWorkArea.displayAddGroup();
            $("#eventGroupAddAction").html(heading);

            $("#saveAddEgBtn").off().on("click", function () {
                form.save(groupEventId);
            });

            $("#cancelAddEgBtn").off().on("click", function () {
                form.cancel(groupEventId);
            });

        }, false);

    };

    form.cancel = function(groupEventId) {
        SN.eventController.single(groupEventId, function (event) {
            SN.eventTree.displayTree($("#eventId").val(), function () {
                SN.eventRound.display(event);
            });

        }, false);
    };

    form.save = function(groupEventId) {
        SN.console.log("About to save");

        var fieldsToIgnore = _.difference(_.keys(form.fields), [
            form.EVENT_ID,
            form.TEAM_ID
        ]);

        var data = form.retrieve(fieldsToIgnore);

        SN.console.log("Sending data: " + JSON.stringify(data));
        form.clear();

        var successCallback = function (data) {
            SN.console.log("Created new group entry: " + data);

            SN.eventController.single(groupEventId, function (event) {
                SN.eventTree.displayTree($("#eventId").val(), function () {
                    SN.eventRound.display(event);
                });

            }, false);
        };

        groupController.save(data, successCallback, false);
    };


    return form;
}();



