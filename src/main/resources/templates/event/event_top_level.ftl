<#-- @ftlvariable name="" type="com.sinferno.view.sportsEvent.TopLevelView" -->

<!DOCTYPE html>
<html lang="en">
<head>
${commonHeaders}

    <meta name="description" content="${description}"/>
    <title>${title}</title>

${css}

</head>
<body>
<#include "../sections/topbar.ftl" encoding="Shift_JIS">

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-12 main">
            <h1 class="page-header">${title}</h1>

            <p>&nbsp;</p>

            <div class="alert" id="errorsDiv" style="display: none;"></div>
            <div class="alert alert-success" id="successDiv" role="alert" style="display: none;"></div>

            <form class="form-horizontal" role="form" id="frmEvent">

            <#-- Only show eventId if it is not zero -->
                <input type="hidden" id="eventId" value="${(eventId != 0)?then('' + eventId, '')}"/>

                <input type="hidden" id="rootId" value=""/>
                <input type="hidden" id="parentId" value=""/>
                <input type="hidden" id="leftSiblingId" value=""/>
                <input type="hidden" id="eventType" value="${eventType}"/>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="name">Event</label>

                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="name" placeholder="">
                    </div>
                    <span class="help-block"></span>
                </div>

                <div class="form-group${(eventType == "MATCH")?then(' blockHide', '')}">
                    <label class="control-label col-sm-2">&nbsp;</label>

                    <div class="col-sm-3">
                        <div id="treatAsGroupDisplay">
                            <input type="checkbox" id="treatAsGroup">
                            <label class="control-label" for="treatAsGroup">Treat As Group</label>
                        </div>
                    </div>
                    <span class="help-block"></span>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="sportsType">Sports Type</label>

                    <div class="col-sm-3">
                        <select class="form-control" id="sportsType">
                            <option></option>
                        </select>
                    </div>
                    <div class="col-sm-3">
                        <select class="form-control" id="sportsSubType">
                            <option></option>
                        </select>
                    </div>

                    <span class="help-block"></span>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="gender">Gender</label>

                    <div class="col-sm-6">
                        <select class="form-control" id="gender">
                            <option></option>
                        </select>
                    </div>
                    <span class="help-block"></span>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="venue">Venue</label>

                    <div class="col-sm-6">
                        <select class="form-control" id="venue">
                            <option></option>
                        </select>
                    </div>

                    <span class="help-block"></span>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="startDate">Start Date</label>

                    <div class="col-sm-3">
                        <div id="startDateGroup" class="input-group date form_date"
                             data-date-format="M dd yyyy" data-link-field="startDate" data-link-format="yyyy-mm-dd">

                            <input class="form-control" size="12" type="text" value="" readonly id="startDateField" >
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div id="startTimeGroup"
                             class="input-group date form_time${(eventType == "MATCH")?then('', ' blockHide')}"
                             data-date-format="H:ii p" data-link-field="startTime" data-link-format="hh:ii">

                            <input class="form-control" size="8" type="text" value="" readonly id="startTimeField" >
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                        </div>
                    </div>

                    <input type="hidden" id="startDate" value=""/>
                    <input type="hidden" id="startTime" value=""/>

                    <span class="help-block"></span>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="endDate">End Date</label>

                    <div class="col-sm-3">
                        <div id="endDateGroup" class="input-group date form_date"
                             data-date-format="M dd yyyy" data-link-field="endDate" data-link-format="yyyy-mm-dd">

                            <input class="form-control" size="12" type="text" value="" readonly id="endDateField">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div id="endTimeGroup"
                             class="input-group date form_time${(eventType == "MATCH")?then('', ' blockHide')}"
                             data-date-format="H:ii p" data-link-field="endTime" data-link-format="hh:ii" data-date="">

                            <input class="form-control" size="8" type="text" value="" readonly id="endTimeField">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                        </div>
                    </div>

                    <input type="hidden" id="endDate" value=""/>
                    <input type="hidden" id="endTime" value=""/>

                    <span class="help-block"></span>
                </div>
                <div class="form-group${(eventType == "MATCH")?then(' blockHide', '')}">
                    <label class="control-label col-sm-2" for="timezoneType">Timezone</label>

                    <div class="col-sm-6">
                        <select class="form-control" id="timezoneType">
                            <option></option>
                        </select>
                    </div>
                    <span class="help-block"></span>
                </div>
                <div class="form-group blockHide">
                    <label class="control-label col-sm-2" for="timezone">Timezone Value</label>

                    <div class="col-sm-6">
                        <select class="form-control" id="timezone">
                            <option></option>
                        </select>
                    </div>
                    <span class="help-block"></span>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="description">Notes</label>

                    <div class="col-sm-6">
                        <textarea class="form-control" id="description" placeholder="" rows="4"></textarea>
                    </div>
                    <span class="help-block"></span>
                </div>

                <div class="col-sm-8" style="text-align: right;">
                    <button type="button" class="btn btn-default" id="cancelBtn">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveBtn">Save</button>
                </div>
            </form>
        </div>

    </div>
</div>

${js}

</body>
</html>
