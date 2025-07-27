SN.eventForm = function () {
    // No EL for now - assumption is that all ids in a page should be unique

    var form = SN.BaseEventForm.create();

    form.overrideFieldAttribute(form.EVENT_ID, "id", "#eventDetailsId");
    form.overrideField(form.SPORTS_TYPE, {id: "#sportsType", type: SN.dom.HIDDEN, ignoreZero: true});
    form.overrideField(form.SPORTS_SUBTYPE, {id: "#sportsSubType", type: SN.dom.HIDDEN, ignoreZero: true});

    form.handleTimezoneTypeChangeEvent = function () {
        var timezoneTypeField = form.getField(form.TIMEZONE_TYPE);
        var timezoneField = form.getField(form.TIMEZONE);

        $(timezoneTypeField.id).off().on('change', function () {
            var timezoneType = $(this).val();
            var isTypeOther = (timezoneType === "OTHER");

            SN.dom.setSelectizeDropdownValue(timezoneField.id, "");
            SN.dom.toggleFieldView(timezoneField.id, isTypeOther);
        });
    };

    return form;
}();

