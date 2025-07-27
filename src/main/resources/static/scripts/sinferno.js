(function (window, $, undefined) {
    'use strict';

    _.mixin(_.string.exports());

    if (!window.SN) {
        window.SN = {};
    }

    SN.navigator = {
        goHome: function () {
            window.location.href = "/";
        },
        goDashboard: function () {
            window.location.href = "/dashboard";
        },
        goEventHome: function () {
            window.location.href = "/events/list";
        },
        goEntityHome: function () {
            window.location.href = "/entities/list";
        },
        goPersonHome: function () {
            window.location.href = "/persons/list";
        },
        goVenueHome: function () {
            window.location.href = "/venues/list";
        },
        goAuthPage: function () {
            var errorPageUrl = "/error/401";
            if (window.location.href !== errorPageUrl) {
                window.location.href = errorPageUrl;
            }
        }
    };

    SN.dom = {
        DATE_DIALOG_OPTIONS: {
            language: 'en',
            weekStart: 0,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        },
        TIME_DIALOG_OPTIONS: {
            language: 'en',
            weekStart: 0,
            todayBtn: 0,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView: 0,
            maxView: 1,
            forceParse: 0,
            showMeridian: 1,
            minuteStep: 15
        },

        HIDDEN: "hidden",
        TEXTBOX: "textbox",
        CHECKBOX: "checkbox",
        DROPDOWN: "dropdown",
        DATE_PICKER: "datepicker",
        TIME_PICKER: "timepicker",
        TEXTAREA: "textarea",

        getHidden: function (field) {
            return $(field).val();
        },
        setHidden: function (field, value) {
            $(field).val(value);
        },
        getTextbox: function (field) {
            return $(field).val();
        },
        setTextbox: function (field, value) {
            $(field).val(value);
        },
        getTextarea: function (field) {
            return $(field).val();
        },
        setTextarea: function (field, value) {
            $(field).val(value);
        },
        setDateGroup: function (field, value) {
            $(field).val(value === "" ? "" : moment(value, "MMM DD, YYYY").format("YYYY-MM-DD"));
            $(field + "Field").val(value);
            $(field + "Group").data('date', value);
        },
        setTimeGroup: function (field, value) {
            $(field).val(value === "" ? "" : moment(value, "h:mm a").format("HH:mm"));
            $(field + "Field").val(value);
            $(field + "Group").data('time', value);
        },
        isChecked: function (checkboxField) {
            //SN.console.log("Attempting to get the value of " + checkboxField);
            return $(checkboxField).prop('checked');
        },
        markChecked: function (checkboxField, checkIt) {
            var shouldCheck = (checkIt == true); //Implicit conversion
            $(checkboxField).prop('checked', shouldCheck);
        },
        enableChecked: function (checkboxField, enable) {
            //SN.console.log("Attempting to disable " + checkboxField + " with value " + enable);
            $(checkboxField).prop("disabled", !enable);
            if (!enable) {
                SN.dom.markChecked(checkboxField, false);
            }
        },
        populateDropdown: function (dropdownField, dropdownValues) {
            _.each(dropdownValues, function (dropdownValue) {
                //SN.console.log(JSON.stringify(dropdownValue));

                var option = {value: dropdownValue.id, text: dropdownValue.display};
                $(dropdownField).append($('<option>', option));
            });
        },
        populateSelectizeDropdowns: function (dataArray) {
            _.each(dataArray, function (data) {
                var dropdownField = data.field;
                var dropdownValues = data.values;

                var selectiveDropdownField = $(dropdownField)[0].selectize;
                if (selectiveDropdownField) {
                    selectiveDropdownField.clearOptions();
                    selectiveDropdownField.addOption({value: '', text: ''});
                    _.each(dropdownValues, function (dropdownValue) {
                        var option = {value: dropdownValue.id, text: dropdownValue.display};
                        selectiveDropdownField.addOption(option);
                    });
                }
                else {
                    SN.dom.populateDropdown(dropdownField, dropdownValues);
                    $(dropdownField).selectize();
                }

                var defaultValue = data.defaultValue;
                if (defaultValue != undefined && defaultValue != null) {
                    SN.dom.setSelectizeDropdownValue(dropdownField, defaultValue);
                }
            });
        },
        setSelectizeDropdownValue: function (dropdownField, defaultValue) {
            //SN.console.log("setSelectizeDropdownValue for " + dropdownField + " with " + defaultValue);
            $(dropdownField)[0].selectize.setValue(defaultValue);
        },
        getSelectizeDropdownValue: function (dropdownField) {
            var selectedItems = $(dropdownField)[0].selectize.items;
            return selectedItems === [] ? "" : selectedItems[0];
        },
        obtainActionCell: function (rootUrl, recordId, noHref) {
            return '<td>' + SN.dom.obtainAction(rootUrl, recordId, noHref) + '</td>';
        },
        obtainAction: function (rootUrl, recordId, noHref) {
            var href = rootUrl + recordId;

            if (!_.isUndefined(noHref) && noHref === true) {
                href = "#";
            }

            return SN.dom.obtainEditActionWithHref(href, "editRecord") +
                    SN.dom.obtainDeleteAction(recordId, "deleteRecord");
        },
        obtainEditActionWithHref: function(href, classId) {
            return '<a href="' + href + '" class="' + classId + '">' +
                '<i class="fa fa-pencil" aria-hidden="true"></i>' +
                '</a> ';
        },
        obtainAddAction: function(recordId, classId) {
            return SN.dom.obtainLinkedAction(recordId, classId, 'fa-plus');
        },
        obtainEditAction: function(recordId, classId) {
            return SN.dom.obtainLinkedAction(recordId, classId, 'fa-pencil');
        },
        obtainDeleteAction: function(recordId, classId) {
            return SN.dom.obtainLinkedAction(recordId, classId, 'fa-trash');
        },
        obtainLinkedAction: function(recordId, classId, faClass) {
            return '<a href="#">' +
                    '<i class="fa ' + faClass + ' ' + classId + '" aria-hidden="true" data-id="' + recordId + '"></i>' +
                    '</a>';
        },
        obtainDateRangeDisplay: function (startDate, endDate) {
            if (startDate === "" && endDate === "") {
                return "";
            }

            var dates = [];
            if (startDate !== "") {
                dates.push(startDate);
            }
            if (endDate !== "") {
                dates.push(endDate);
            }

            switch (dates.length) {
                case 0:
                    return "";
                case 1:
                    return dates[0];
                default:
                    return dates.join(" to ");
            }
        },
        getFieldValue: function (field) { //Need to have id and type
            switch (field.type) {
                case SN.dom.HIDDEN:
                    return SN.dom.getHidden(field.id);
                case SN.dom.TEXTBOX:
                    return SN.dom.getTextbox(field.id);
                case SN.dom.CHECKBOX:
                    return SN.dom.isChecked(field.id);
                case SN.dom.TEXTAREA:
                    return SN.dom.getTextarea(field.id);
                case SN.dom.DROPDOWN:
                    return SN.dom.getSelectizeDropdownValue(field.id);
                case SN.dom.DATE_PICKER:
                    return SN.dom.getHidden(field.id); //Because there is a backing field
                case SN.dom.TIME_PICKER:
                    return SN.dom.getHidden(field.id);
            }

            throw new Error("Invalid data type: " + field.type);
        },

        setFieldValue: function (field, value) {
            SN.console.log("Setting " + field.id + " to " + value);
            if (field.readOnly === true) {
                SN.console.log("Ignore overwrite of field " + field.id);
                return;
            }
            switch (field.type) {
                case SN.dom.HIDDEN:
                    SN.dom.setHidden(field.id, value);
                    break;
                case SN.dom.TEXTBOX:
                    SN.dom.setTextbox(field.id, value);
                    break;
                case SN.dom.CHECKBOX:
                    SN.dom.markChecked(field.id, value);
                    break;
                case SN.dom.TEXTAREA:
                    SN.dom.setTextarea(field.id, value);
                    break;
                case SN.dom.DROPDOWN:
                    SN.dom.setSelectizeDropdownValue(field.id, value);
                    break;
                case SN.dom.DATE_PICKER:
                    SN.dom.setDateGroup(field.id, value);
                    break;
                case SN.dom.TIME_PICKER:
                    SN.dom.setTimeGroup(field.id, value);
                    break;
                default:
                    throw new Error("Invalid data type: " + field.type);
            }
        },
        clearFieldValue: function (field) {
            if (field.readOnly === true) {
                SN.console.log("Ignore overwrite of field " + field.id);
                return;
            }

            switch (field.type) {
                case SN.dom.HIDDEN:
                    SN.dom.setHidden(field.id, "");
                    break;
                case SN.dom.TEXTBOX:
                    SN.dom.setTextbox(field.id, "");
                    break;
                case SN.dom.CHECKBOX:
                    SN.dom.markChecked(field.id, false);
                    break;
                case SN.dom.TEXTAREA:
                    SN.dom.setTextarea(field.id, "");
                    break;
                case SN.dom.DROPDOWN:
                    SN.dom.setSelectizeDropdownValue(field.id, "");
                    break;
                case SN.dom.DATE_PICKER:
                    SN.dom.setDateGroup(field.id, "");
                    break;
                case SN.dom.TIME_PICKER:
                    SN.dom.setTimeGroup(field.id, "");
                    break;
                default:
                    throw new Error("Invalid data type: " + field.type);
            }
        },

        toggleFieldView: function (field, display) {
            var element;
            if (field.displayGroupEl) {
                element = $(field.displayGroupEl);
            }
            else if (field.id) {
                element = $(field.id).closest(".form-group");
            }
            else {
                element = $(field).closest(".form-group");
            }
            SN.dom.toggleView(element, display);
        },
        toggleElementView: function (element, display) {
            element.toggleClass("blockHide", !display);
        },
        toggleView: function (id, display) {
            SN.dom.toggleElementView($(id), display);
        }
    };

    SN.standardFormView = function () {
        return {
            clear: function () {
                SN.errorDisplay.hide("#errorsDiv");
                $("#successDiv").hide();

                $(".form-group").removeClass("has-error");
                $(".form-group .help-block").html("");
            }
        };
    };

    //TODO: Change this so that we have debug, info and error methods
    //We will have a prod.js and dev.js file to provide different sets of logging
    SN.console = {
        log: function (message) {
            //For IE, we may need to do something different
            if (window.console) {
                window.console.log(message);
            }
        },
        logObject: function(object)  {
            if (_.isNull(object) || _.isUndefined(object)) {
                return;
            }

            SN.console.log(JSON.stringify(object));
        }
    };

    SN.errorDisplay = {
        show: function (errorDiv, errorMessage) {
            $(errorDiv).html(errorMessage);
            $(errorDiv).show();
            $(errorDiv).css({"color": "red", "border": "1px solid #999999", "background-color": "#eeeeee"});

            SN.dom.toggleView(errorDiv, true);
        },
        hide: function (errorDiv) {
            $(errorDiv).html("");
            $(errorDiv).hide();

            SN.dom.toggleView(errorDiv, false);
        }
    };

    SN.initializedTime = new Date().getTime();

    SN.timer = {
        reset: function () {
            SN.initializedTime = new Date().getTime();
        },
        elapsed: function () {
            var start = SN.initializedTime;
            return (SN.initializedTime = new Date().getTime()) - start;
        }
    };

    //noinspection JSUnusedGlobalSymbols
    SN.ajaxHelper = {

        makeCall: function (url, type, data, onSuccess, onFailure) {
            $.ajax({url: url, type: type, data: data})
                .done(function (data) {
                    if (data !== null && data !== undefined) {
                        //SN.console.log("Response: " + JSON.stringify(data));
                        onSuccess(data);
                    }
                    else {
                        //How much do we want to tell the end user!
                        //We should not be getting null or undefined errors
                        //Empty response may be fine, such as hitting a list
                        SN.console.log("Data returned on call to " + url + " returned null");
                    }
                })
                .fail(function (jqXHR, error, errorThrown) {
                    //onFailure is used if needed inside the standard error Handler
                    SN.ajaxHelper.errorHandler(jqXHR, error, errorThrown, onFailure);
                });
        },

        makeSynchronousCall: function (url, type, data, onSuccess, onFailure) {
            var successCallback = function (data) {
                if (data !== null && data !== undefined) {
                    SN.console.log("Response: " + JSON.stringify(data));
                    onSuccess(data);
                }
                else {
                    SN.console.log("Data returned on call to " + url + " returned null");
                }
            };
            var failureCallback = function (jqXHR, error, errorThrown) {
                //onFailure is used if needed inside the standard error Handler
                SN.console.log("Error: " + JSON.stringify(error));
                SN.ajaxHelper.errorHandler(jqXHR, error, errorThrown, onFailure);
            };
            $.ajax({
                async: false,
                url: url,
                type: type,
                data: data,
                success: successCallback,
                error: failureCallback
            });

        },

        errorHandler: function (jqXHR, error, errorThrown, onFailure) {
            if (onFailure) {
                onFailure(jqXHR, error, errorThrown);
            }
            else {
                SN.ajaxHelper.displayErrorResponse(jqXHR, error, errorThrown, "#errorsDiv");
            }
        },

        displayFieldErrorMessage: function (id, errorMessage) {
            errorMessage = _.str.capitalize(_.str.trim(errorMessage));

            var formGroup = $("#" + id).closest(".form-group");
            var helpBlock = formGroup.find(".help-block");
            var newHtml = helpBlock.html() === "" ? errorMessage : helpBlock.html() + "<br/>" + errorMessage;

            formGroup.addClass("has-error");
            helpBlock.html(newHtml);

            SN.dom.toggleView(helpBlock, true);

            return formGroup.length !== 0;
        },

        displayErrorResponse: function (jqXHR, error, errorThrown, errorDiv) {
            if (jqXHR && jqXHR.responseText) {
                SN.console.log("jqXHR, status=" + jqXHR.status + ", responseText=" + jqXHR.responseText);
            }

            var errorHtml = "";

            if (jqXHR.status) {
                switch (jqXHR.status) {
                    case 400:
                        errorHtml = "<strong>Invalid Request</strong>: " + jqXHR.responseText;
                        break;
                    case 401:
                        SN.navigator.goAuthPage();
                        break;
                    case 404:
                        errorHtml = "<strong>Not Found</strong>: " + jqXHR.responseText;
                        break;
                    case 500:
                        errorHtml = "<strong>Server Error</strong>: " + jqXHR.responseText;
                        break;
                    case 422:
                        errorHtml = ""; //We have already done what we needed to do
                        _.each(JSON.parse(jqXHR.responseText).errors, function (error) {
                            var fieldErrorUpdated = SN.ajaxHelper.displayFieldErrorMessage(error.id, error.message);
                            if (!fieldErrorUpdated) {
                                errorHtml += error.message + "<br/>";
                            }
                        });

                        break;
                    default:
                        errorHtml = jqXHR.responseText;
                }
            }
            else {
                errorHtml = "Unexpected error: " + jqXHR.responseText;
            }
            if (errorHtml !== "" && errorDiv !== null && errorDiv !== undefined) {
                SN.errorDisplay.show(errorDiv, errorHtml);
            }
        }
    };
    
    $("#topMenuLogOff").click(function () {
        SN.ajaxHelper.makeCall("/user/logoff", "GET", {}, function (response) {
            if (response === true) {
                SN.navigator.goHome();
            }
        });
    });

    //Set up Ajax defaults
    $.ajaxSetup({
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });

    //Set up moment!
    moment().format();

})(window, jQuery);
