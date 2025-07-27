SN.eventTemplate = {
    eventId: '',
    rootId: '',
    parentId: '',
    leftSiblingId: '',
    name: '',
    venueName: '',
    treatAsGroup: '',
    sportsType: '',
    sportsSubType: '',
    genders: '',
    venues: '',
    timezoneTypes: '',
    timezone: '',
    timezoneType: ''
};

SN.eventRound = {
    view: {
        clear: function () {
            SN.eventForm.clear();
        },
        isTopLevelEvent: function (event) {
            return event.rootId == null || event.rootId == "";
        },
        getValues: function (form, event, isTopLevelEvent) {
            //Treat as group are visible,
            //The latter is only enabled on edit AND if treat as group is checked

            var displayVenue = false;
            var displayTimezoneType = false;
            var displayTimezone = false;

            if (isTopLevelEvent) {
                //Top-level event is true for edit. So the code below is safe
                displayVenue = true;
                displayTimezoneType = true;
                displayTimezone = !_.isNull(event.timezone) && event.timezone !== "";
            }

            return [
                {field: form.NAME, value: event.name},
                {field: form.ROOT_ID, value: event.rootId},
                {field: form.PARENT_ID, value: event.parentId},
                {field: form.LEFT_SIBLING_ID, value: event.leftSiblingId},

                {field: form.TREAT_AS_GROUP, value: event.treatAsGroup},
                {field: form.SPORTS_TYPE, value: event.sportsType, display: false},
                {field: form.SPORTS_SUBTYPE, value: event.sportsSubType, display: false},
                {field: form.EVENT_TYPE, value: event.eventType, display: false},

                {field: form.GENDER, values: event.genders, value: event.gender, display: false},
                {field: form.VENUE_ID, values: event.venues, value: event.venueId, display: displayVenue},

                {field: form.START_DATE, value: event.startDate},
                {field: form.START_TIME, value: event.startTime, display: false},
                {field: form.END_DATE, value: event.endDate},
                {field: form.END_TIME, value: event.endTime, display: false},
                {
                    field: form.TIMEZONE_TYPE,
                    values: event.timezoneTypes,
                    value: event.timezoneType,
                    display: displayTimezoneType
                },
                {field: form.TIMEZONE, value: event.timezone, display: displayTimezone},
                {field: form.DESCRIPTION, value: event.description}
            ];
        },
        getFieldsToIgnore: function () {
            var form = SN.eventForm;
            var isTopLevelEvent = form.isTopLevelEvent();

            if (isTopLevelEvent) {
                return [
                    form.START_TIME,
                    form.END_TIME
                ];
            }

            return [
                form.SPORTS_TYPE,
                form.SPORTS_SUBTYPE,
                form.GENDER,
                form.START_TIME,
                form.END_TIME,
                form.TIMEZONE_TYPE,
                form.TIMEZONE
            ];

        },
        add: function (parentId) {
            var form = SN.eventForm;

            var successCallback = function (event) {
                SN.console.log(JSON.stringify(event));

                $("#eventAction").html("Add Round");

                //We will never be adding a top-level event here
                var values = SN.eventRound.view.getValues(form, event, false);

                form.populate(values);

                SN.eventWorkArea.displayEdit();
            };

            //We should send the parent id as a parameter
            //Get back the root id and expected left sibling id
            //We won't actually use the root id or left sibling id sent in
            //when saving. We will get that from the parent

            form.setIdFieldValue(""); //Set the event id to empty

            SN.eventController.addUnderParent(parentId, "ROUND", successCallback, false);

            $("#saveBtn").off().on("click", function () {
                SN.eventRound.view.save();
            });

        },
        save: function () {
            var form = SN.eventForm;
            var fieldsToIgnore = SN.eventRound.view.getFieldsToIgnore();
            var data = form.retrieve(fieldsToIgnore);

            SN.console.log("Sending data: " + JSON.stringify(data));
            SN.eventRound.view.clear();

            var successCallback = function (eventId) {
                SN.console.log("Created new event with id: " + eventId);

                SN.eventController.single(eventId, function (event) {
                    SN.eventTree.displayTree($("#eventId").val(), function () {
                        SN.eventRound.display(event);
                    });

                }, false);
            };

            SN.eventController.save(data, successCallback, false);
        },

        edit: function () {
            var eventId = $("#eventDetailsId").val();
            var successCallback = function (event) {
                $("#eventAction").html("Edit Round");

                var form = SN.eventForm;
                var values = SN.eventRound.view.getValues(form, event,
                    SN.eventRound.view.isTopLevelEvent(event));

                form.populate(values);
                form.handleTimezoneTypeChangeEvent();

                SN.eventWorkArea.displayEdit();
            };

            SN.eventController.edit(eventId, successCallback, false);

            $("#saveBtn").off().on("click", function () {
                SN.eventRound.view.update();
            });
        },

        update: function () {
            var form = SN.eventForm;
            var fieldsToIgnore = SN.eventRound.view.getFieldsToIgnore();
            var data = form.retrieve(fieldsToIgnore);

            SN.console.log("Sending data: " + JSON.stringify(data));
            SN.eventRound.view.clear();

            var successCallback = function (response) {
                SN.console.log("Response of update round: " + JSON.stringify(response));
                //response is true or false
                SN.eventController.single(data.eventId, function (event) {
                    SN.eventTree.displayTree($("#eventId").val(), function () {
                        SN.eventRound.display(event);
                    });
                }, false);
            };

            SN.eventController.update(data, successCallback, false);
        }
    },

    display: function (event) {
        //SN.console.log("Event: " + JSON.stringify(event));

        var display = "";
        display += "<h2>" + _.escape(event.name) + "</h2>";
        display += "<p>" + _.escape(event.description) + "<br/>";

        if (event.sportsType) {
            if (!_.isUndefined(event.gender) && !_.isNull(event.gender)) {
                display += _.escape(event.gender.description) + " ";
            }
            display += _.escape(event.sportsType.description) + " (" + _.escape(event.sportsSubType.description) + ")<br/>";
        }
        if (event.venueName !== "") {
            display += "Venue: " + _.escape(event.venueName) + "<br/>";
        }
        if (event.startDate !== "" || event.endDate !== "") {
            //Rounds should not have a time component
            var dateDisplay = SN.dom.obtainDateRangeDisplay(event.startDate, event.endDate);
            display += "Date: " + dateDisplay + "<br/>";
        }

        display += "</p>";

        var isTopLevelEvent = SN.eventRound.view.isTopLevelEvent(event);

        if (isTopLevelEvent) {
            display += '<div id="teams"></div>';
        }
        else if (event.treatAsGroup) {
            display += '<div id="groups"></div>';
            display += '<div id="matches"></div>';
        }

        SN.eventForm.setIdFieldValue(event.eventId);

        var workArea = SN.eventWorkArea;
        workArea.displayView(display);

        if (isTopLevelEvent) {
            SN.entityToEvent.view.display("#teams", event.eventId, event.associatedEntities);
        }
        else if (event.treatAsGroup) {
            var groupDisplay = SN.Group.factory.getGroup(SN.eventTree.sportsType, SN.eventTree.sportsSubType);
            $("#groups").html(groupDisplay.buildInfoEditable(event.groupNodeList, event.eventId));

            groupDisplay.setupEvents(event.eventId);

            var matchDisplay = SN.Match.factory.getMatch(SN.eventTree.sportsType, SN.eventTree.sportsSubType);

            $("#matches").append(matchDisplay.buildList(event.matchNodeList));
        }

        if (event.treatAsGroup) {
            workArea.hideButtons([workArea.ADD_ROUND]);
            workArea.showButtons([workArea.ADD_MATCH]);
        }
        else {
            //If not a group, we could add both rounds and matches, but
            //it depends on what we have already added
            var childTypes = SN.eventTree.treeMap[event.eventId].childTypes;
            workArea.toggleButtons(childTypes, [workArea.ADD_ROUND, workArea.ADD_MATCH]);
        }

        $("#addRound").off().on('click', function () {
            SN.eventRound.view.add(SN.eventForm.getIdFieldValue());
        });

        $("#addMatch").off().on('click', function () {
            SN.eventMatch.view.add(SN.eventForm.getIdFieldValue());
        });

        $("#editBtn").off().on("click", function () {
            SN.eventRound.view.edit();
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
