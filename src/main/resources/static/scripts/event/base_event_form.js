SN.BaseEventForm = {};

SN.BaseEventForm.create = function() {
    var form = SN.StandardForm.create();

    var attributes = {
        EVENT_ID: "eventId",
        ROOT_ID: "rootId",
        PARENT_ID: "parentId",
        LEFT_SIBLING_ID: "leftSiblingId",
        NAME: "name",

        TREAT_AS_GROUP: "treatAsGroup",
        EVENT_TYPE: "eventType",
        SPORTS_TYPE: "sportsType",
        SPORTS_SUBTYPE: "sportsSubType",

        GENDER: "gender",
        VENUE_ID: "venueId",
        START_DATE: "startDate",
        START_TIME: "startTime",

        END_DATE: "endDate",
        END_TIME: "endTime",
        TIMEZONE_TYPE: "timezoneType",
        TIMEZONE: "timezone",
        DESCRIPTION: "description"
    };

    form = _.extend(form, attributes);

    var dom = SN.dom;

    var fields = {};
    //Event id should be the only readonly value by default
    fields[form.EVENT_ID] = {id: "#eventId", type: dom.HIDDEN, ignoreZero: true, readOnly: true};
    fields[form.ROOT_ID] = {id: "#rootId", type: dom.HIDDEN, ignoreZero: true};
    fields[form.PARENT_ID] = {id: "#parentId", type: dom.HIDDEN, ignoreZero: true};
    fields[form.LEFT_SIBLING_ID] = {id: "#leftSiblingId", type: dom.HIDDEN, ignoreZero: true};
    fields[form.NAME] = {id: "#name", type: dom.TEXTBOX};

    fields[form.TREAT_AS_GROUP] = {id: "#treatAsGroup", type: dom.CHECKBOX};
    fields[form.EVENT_TYPE] = {id: "#eventType", type: dom.HIDDEN};
    fields[form.SPORTS_TYPE] = {id: "#sportsType", type: dom.DROPDOWN};
    fields[form.SPORTS_SUBTYPE] = {id: "#sportsSubType", type: dom.DROPDOWN};

    fields[form.GENDER] = {id: "#gender", type: dom.DROPDOWN};
    fields[form.VENUE_ID] = {id: "#venue", type: dom.DROPDOWN};
    fields[form.START_DATE] = {id: "#startDate", type: dom.DATE_PICKER, displayGroupEl: '#startDateGroup'};
    fields[form.START_TIME] = {id: "#startTime", type: dom.TIME_PICKER, displayGroupEl: '#startTimeGroup'};

    fields[form.END_DATE] = {id: "#endDate", type: dom.DATE_PICKER, displayGroupEl: '#endDateGroup'};
    fields[form.END_TIME] = {id: "#endTime", type: dom.TIME_PICKER, displayGroupEl: '#endTimeGroup'};
    fields[form.TIMEZONE_TYPE] = {id: "#timezoneType", type: dom.DROPDOWN};
    fields[form.TIMEZONE] = {id: "#timezone", type: dom.DROPDOWN};
    fields[form.DESCRIPTION] = {id: "#description", type: dom.TEXTAREA};

    form.fields = fields;

    form.initialize = function () {
        if (!form.init()) {
            return false;
        }

        $(".form_date").datetimepicker(dom.DATE_DIALOG_OPTIONS);
        $(".form_time").datetimepicker(dom.TIME_DIALOG_OPTIONS);
        $(".datetimepicker").addClass("timepicker");

        return true;
    };

    return form;
};
