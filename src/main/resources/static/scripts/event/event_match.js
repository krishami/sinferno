SN.eventMatch = {
    view: {
        clear: function () {
            SN.eventForm.clear();
        },
        getValues: function (form, event) {
            //Treat as Group is always false for Matches
            return [
                {field: form.NAME, value: event.name},
                {field: form.ROOT_ID, value: event.rootId},
                {field: form.PARENT_ID, value: event.parentId},
                {field: form.LEFT_SIBLING_ID, value: event.leftSiblingId},

                {field: form.TREAT_AS_GROUP, value: event.treatAsGroup, display: false},
                {field: form.SPORTS_TYPE, value: event.sportsType, display: false},
                {field: form.SPORTS_SUBTYPE, value: event.sportsSubType, display: false},
                {field: form.EVENT_TYPE, value: event.eventType, display: false},

                {field: form.GENDER, values: event.genders, value: event.gender, display: false},
                {field: form.VENUE_ID, values: event.venues, value: event.venueId},

                {field: form.START_DATE, value: event.startDate},
                {field: form.START_TIME, value: event.startTime},
                {field: form.END_DATE, value: event.endDate},
                {field: form.END_TIME, value: event.endTime},

                {field: form.TIMEZONE_TYPE, values: event.timezoneTypes, value: event.timezoneType, display: false},
                {field: form.TIMEZONE, value: event.timezone, display: false},
                {field: form.DESCRIPTION, value: event.description}
            ];
        },
        getFieldsToIgnore: function () {
            var form = SN.eventForm;
            return [
                form.SPORTS_TYPE,
                form.SPORTS_SUBTYPE,
                form.GENDER,
                form.TIMEZONE_TYPE,
                form.TIMEZONE
            ];
        },
        add: function (parentId) {
            var form = SN.eventForm;

            var successCallback = function (event) {
                SN.console.log("Match: " + JSON.stringify(event));

                $("#eventAction").html("Add Match");

                var values = SN.eventMatch.view.getValues(form, event);

                form.populate(values);

                SN.eventWorkArea.displayEdit();
            };

            form.setIdFieldValue(""); //Set the event id to empty

            SN.eventController.addUnderParent(parentId, "MATCH", successCallback, false);

            $("#saveBtn").off().on("click", function () {
                SN.eventMatch.view.save();
            });
        },
        save: function () {
            var form = SN.eventForm;
            var fieldsToIgnore = SN.eventMatch.view.getFieldsToIgnore();
            var data = form.retrieve(fieldsToIgnore);

            SN.console.log("Sending data: " + JSON.stringify(data));
            SN.eventMatch.view.clear();

            var successCallback = function (eventId) {
                SN.console.log("Created new event with id: " + eventId);

                SN.eventController.single(eventId, function (event) {
                    SN.eventTree.displayTree($("#eventId").val(), function () {
                        SN.eventMatch.display(event);
                    });

                }, false);
            };

            SN.eventController.save(data, successCallback, false);
        },

        edit: function () {
            var eventId = $("#eventDetailsId").val();
            var successCallback = function (event) {
                $("#eventAction").html("Edit Match");

                var form = SN.eventForm;
                var values = SN.eventMatch.view.getValues(form, event);

                form.populate(values);

                SN.eventWorkArea.displayEdit();
            };

            SN.eventController.edit(eventId, successCallback, false);

            $("#saveBtn").off().on("click", function () {
                SN.eventMatch.view.update();
            });
        },

        update: function () {
            var form = SN.eventForm;
            var fieldsToIgnore = SN.eventMatch.view.getFieldsToIgnore();
            var data = form.retrieve(fieldsToIgnore);

            SN.console.log("Sending data: " + JSON.stringify(data));
            SN.eventMatch.view.clear();

            var successCallback = function (response) {
                SN.console.log("Match update response: " + JSON.stringify(response));
                SN.eventController.single(data.eventId, function (event) {
                    SN.eventTree.displayTree($("#eventId").val(), function () {
                        SN.eventMatch.display(event);
                    });

                }, false);
            };

            SN.eventController.update(data, successCallback, false);
        }
    },

    display: function (event) {
        SN.console.log(JSON.stringify(event));

        var matchDisplay = SN.Match.factory.getMatch(SN.eventTree.sportsType, SN.eventTree.sportsSubType);
        var display = matchDisplay.buildEvent(event, event.match);

        SN.eventForm.setIdFieldValue(event.eventId);

        var workArea = SN.eventWorkArea;
        workArea.displayView(display);
        workArea.hideButtons([workArea.ADD_ROUND, workArea.ADD_MATCH]);

        $("#editBtn").off().on("click", function () {
            SN.eventMatch.view.edit();
        });

        $("#deleteBtn").off().on("click", function () {
            SN.eventController.delete(SN.eventForm.getIdFieldValue(), function (response) {
                SN.console.log("Delete response: " + JSON.stringify(response));

                var rootEventId = $("#eventId").val();
                SN.eventTree.displayTree(rootEventId, function () {
                    SN.eventController.single(rootEventId, function (event) {
                        SN.eventRound.display(event);
                    }, false);
                });

            });
        });

    }
};
