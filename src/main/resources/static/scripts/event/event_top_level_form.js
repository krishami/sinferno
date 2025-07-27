SN.EventTopLevelForm = {};

SN.EventTopLevelForm.create = function() {
    // No EL for now - assumption is that all ids in a page should be unique

    var form = SN.BaseEventForm.create();
    
    form.overrideFieldAttribute(form.ROOT_ID, "readOnly", true);
    form.overrideFieldAttribute(form.PARENT_ID, "readOnly", true);
    form.overrideFieldAttribute(form.LEFT_SIBLING_ID, "readOnly", true);
    form.overrideFieldAttribute(form.EVENT_TYPE, "readOnly", true);

    var sportsSubTypes = [];
    var sportsTypeToSportsSubTypes = {};

    form.handleCustomEvents = function (model) {
        var timezoneTypeField = form.getField(form.TIMEZONE_TYPE);
        var timezoneField = form.getField(form.TIMEZONE);

        $('.form_time').datetimepicker().on('changeDate', function (event) {
            var startTimeField = form.getField(form.START_TIME);
            var startTime = SN.dom.getFieldValue(startTimeField);
            var endTimeField = form.getField(form.END_TIME);
            var endTime = SN.dom.getFieldValue(endTimeField);

            var displayTimezone = (startTime !== "" || endTime !== "");

            if (displayTimezone) {
                SN.dom.toggleFieldView(timezoneTypeField, displayTimezone);
                //Don't turn on timezone yet
            }
            else {
                SN.dom.toggleFieldView(timezoneTypeField, displayTimezone);
                SN.dom.toggleFieldView(timezoneField, displayTimezone);

                SN.dom.clearFieldValue(timezoneTypeField);
                SN.dom.clearFieldValue(timezoneField);
            }
        });

        $(timezoneTypeField.id).off().on('change', function () {
            var timezoneType = $(this).val();
            var isTypeOther = (timezoneType === "OTHER");

            SN.dom.setSelectizeDropdownValue(timezoneField.id, "");
            SN.dom.toggleFieldView(timezoneField.id, isTypeOther);
        });

        //We get a multi-map from the server which gives us the type to sub-types
        sportsTypeToSportsSubTypes = model.sportsTypeToSportsSubTypes;

        //The above map doesn't have the display, Sorry!
        _.each(model.sportsSubTypes, function (sportsSubType) {
            sportsSubTypes[sportsSubType.id] = sportsSubType.display
        });

        var sportsTypeField = form.getField(form.SPORTS_TYPE);
        $(sportsTypeField.id).off().on("change", function () {
            form.populateSportsSubType(SN.dom.getFieldValue(sportsTypeField));
        });

    };

    form.populateSportsSubType = function (sportsType, sportsSubType) {
        //Ideally we could reuse the populateFieldValues method, but doesn't seem to be working now

        var field = form.getField(form.SPORTS_SUBTYPE);

        var sportsSubTypeField = $(field.id)[0].selectize;
        sportsSubTypeField.clearOptions();
        sportsSubTypeField.addOption({value: '', text: ''});

        _.each(sportsTypeToSportsSubTypes[sportsType], function (sportsSubTypeId) {
            var sportsSubTypeDisplay = sportsSubTypes[sportsSubTypeId];
            var option = {value: sportsSubTypeId, text: sportsSubTypeDisplay};

            sportsSubTypeField.addOption(option);
        });

        if (sportsSubType) {
            SN.dom.setFieldValue(field, sportsSubType);
        }
    };

    return form;
};

