//This has to be a function as we want a separate form each time

SN.StandardForm = {};

SN.StandardForm.create = function() {
    var form = {};
    form.initialized = false;
    form.fields = {};

    form.overrideFieldAttribute = function (name, attribute, attributeValue) {
        var field = form.getField(name);
        field[attribute] = attributeValue;
    };

    form.overrideField = function (name, attributes) {
        //noinspection JSUnusedLocalSymbols
        var field = form.getField(name);
        form.fields[name] = attributes;
    };

    form.getField = function (name) {
        var field = form.fields[name];
        if (field == undefined || field == null) {
            throw new Error("Undefined field: " + name);
        }
        return field;
    };

    var getValue = function (fieldName) {
        var field = form.getField(fieldName);
        var value = SN.dom.getFieldValue(field);
        //For dropdowns or explicitly stated, change 0 to blank value
        if (field.type === SN.dom.DROPDOWN || field.ignoreZero) {
            return (value == "0") ? "" : value;
        }

        return value;
    };

    var populateFieldValues = function (field, values) {
        if (field.type !== SN.dom.DROPDOWN) {
            throw new Error("Attempt to populate non-dropdown field: " + field.id);
        }

        SN.dom.populateSelectizeDropdowns([
            {field: field.id, values: values}
        ]);

    };

    form.getIdFieldValue = function () {
        //TODO: Needs to change ASAP!
        SN.console.log("Getting value of " + form.EVENT_ID);
        return getValue(form.EVENT_ID);
    };

    form.setIdFieldValue = function (value) {
        //TODO: Change EVENT_ID to something else
        var field = form.getField(form.EVENT_ID);
        if (!_.isUndefined(value)) {
            SN.dom.setHidden(field.id, value);
        }
    };

    form.isTopLevelEvent = function () {
        var rootId = getValue(form.ROOT_ID);
        return rootId == null || rootId == "";
    };

    form.init = function () {
        if (form.initialized) {
            return false;
        }

        form.initialized = true;
        return true;
    };

    form.retrieve = function (fieldsToIgnore) {
        var data = {};
        _.each(_.keys(form.fields), function (key) {
            if (!fieldsToIgnore || !_.contains(fieldsToIgnore, key)) {
                data[key] = getValue(key);
            }
        });

        return data;
    };

    form.clearFieldValues = function () {
        _.each(_.values(form.fields), function (field) {
            SN.dom.clearFieldValue(field);
        });
    };

    form.populate = function (model) {
        //SN.console.log("Populate with " + JSON.stringify(model));

        _.each(model, function (data) {
            var field = form.getField(data.field);

            if (field.type == SN.dom.DROPDOWN) {
                if (!_.isUndefined(data.values)) {
                    populateFieldValues(field, data.values);
                }
                else {
                    $(field.id).selectize(); //Make it selectize
                }
            }

            if (!_.isUndefined(data.value) && !_.isNull(data.value)) {
                SN.dom.setFieldValue(field, data.value);
            } else {
                SN.dom.clearFieldValue(field);
            }

            SN.dom.toggleFieldView(field, data.display != false);

            if (!_.isUndefined(data.disabled)) {
                if (field.type === SN.dom.CHECKBOX) {
                    SN.dom.enableChecked(field.id, !data.disabled);
                }
            }

            if (!_.isUndefined(data.value) && data.value !== "" &&
                (field.type === SN.dom.DATE_PICKER || field.type === SN.dom.TIME_PICKER)) {
                $(field.displayGroupEl).datetimepicker('update');
            }
        });

    };

    form.clear = function () {
        SN.errorDisplay.hide("#errorsDiv");
        $("#successDiv").hide();

        $(".form-group").removeClass("has-error");
        $(".form-group .help-block").html("");
    };

    return form;
};
