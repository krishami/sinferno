$(document).ready(function () {
    var form = SN.EventTopLevelForm.create();
    //This gets called before anything else is called
    form.initialize();

    SN.ajaxHelper.makeCall("/timezone/list", "GET", {}, function (data) {
        var fields = [{field: form.TIMEZONE, values: data, display: false}];
        form.populate(fields);
    });

    var obtainFormValues = function (event, isMatch, displayTimezoneType, displayTimezone) {

        return [
            //Do not overwrite event id, root id, parent id, left sibling id and event type
            {field: form.NAME, value: event.name},
            {field: form.TREAT_AS_GROUP, value: event.treatAsGroup, display: !isMatch},
            {field: form.SPORTS_TYPE, values: event.sportsTypes, value: event.sportsType},
            {field: form.SPORTS_SUBTYPE, values: [], value: event.sportsSubType},

            {field: form.GENDER, values: event.genders, value: event.gender},
            {field: form.VENUE_ID, values: event.venues, value: event.venueId},

            {field: form.START_DATE, value: event.startDate},
            {field: form.START_TIME, value: event.startTime, display: isMatch},
            {field: form.END_DATE, value: event.endDate},
            {field: form.END_TIME, value: event.endTime, display: isMatch},

            //If it is a match, the timezone type is only displayed if we select the time
            //But if it is a top-level event, we display it all the time
            {
                field: form.TIMEZONE_TYPE,
                values: event.timezoneTypes,
                value: event.timezoneType,
                display: displayTimezoneType
            },

            //Actual timezone is hidden unless the user selects "OTHER" for timezone type
            {field: form.TIMEZONE, values: event.timezones, value: event.timezone, display: displayTimezone},
            {field: form.DESCRIPTION, value: event.description}
        ];

    };

    var addSuccessCallback = function (event) {
        var isMatch = $("#eventType").val() === "MATCH";

        var values = obtainFormValues(event, isMatch, !isMatch, false);

        form.populate(values);
        form.handleCustomEvents({
            sportsSubTypes: event.sportsSubTypes,
            sportsTypeToSportsSubTypes: event.sportsTypeToSportsSubTypes
        });
    };

    var editSuccessCallback = function (event) {
        //Either it is a top-level event (always display) or else one of the times is not blank
        //in which case the saved timezone type will not be blank
        var isMatch = $("#eventType").val() === "MATCH";
        var displayTimeZoneType = !_.isNull(event.timezoneType) && event.timezoneType !== "";
        var displayTimezone = !_.isNull(event.timezone) && event.timezone !== "";

        var values = obtainFormValues(event, isMatch, displayTimeZoneType, displayTimezone);

        form.populate(values);
        form.handleCustomEvents({
            sportsSubTypes: event.sportsSubTypes,
            sportsTypeToSportsSubTypes: event.sportsTypeToSportsSubTypes
        });

        form.populateSportsSubType(event.sportsType, event.sportsSubType);
    };

    var eventId = $("#eventId").val();

    if (eventId === "") {
        SN.eventController.add(addSuccessCallback);
    }
    else {
        SN.eventController.edit(eventId, editSuccessCallback);
    }

    var onSuccessOrCancel = function (response) {
        //Note that since we quickly navigate to another screen, this console statement may be lost
        //Also cancel apparently sends an event object as the response
        if (!_.isUndefined(response) && !response.originalEvent) {
            SN.console.log("Response for onSuccess or Cancel: " + JSON.stringify(response));
        }

        SN.navigator.goEventHome();
    };

    $("#saveBtn").click(function () {
        var data = form.retrieve();

        form.clear();

        SN.console.log(JSON.stringify(data));

        var eventId = data[form.EVENT_ID];
        if (eventId === "") { //Add mode
            SN.eventController.save(data, onSuccessOrCancel);
        }
        else {
            SN.eventController.update(data, onSuccessOrCancel);
        }

    });

    $("#cancelBtn").click(onSuccessOrCancel);

});

