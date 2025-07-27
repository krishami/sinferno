<#macro eventEditDiv>
<div id="eventEdit" class="blockHide">
    <div class="col-sm-12" style="margin-bottom: 0.3in;">
        <h2 class="col-sm-8" id="eventAction" style="text-align: center;"></h2>

        <p>&nbsp;</p>
    </div>

    <form class="form-horizontal" role="form" id="commonEventForm">
        <input type="hidden" id="rootId" value=""/>
        <input type="hidden" id="parentId" value=""/>
        <input type="hidden" id="leftSiblingId" value=""/>
        <input type="hidden" id="eventType" value=""/>
        <input type="hidden" id="sportsType" value=""/>
        <input type="hidden" id="sportsSubType" value=""/>

        <div class="form-group">
            <label class="control-label col-sm-2" for="name">Event</label>

            <div class="col-sm-6">
                <input type="text" class="form-control" id="name" placeholder="">
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
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
                     data-date-format="M dd yyyy" data-link-field="startDate"
                     data-link-format="yyyy-mm-dd">

                    <#--noinspection HtmlFormInputWithoutLabel-->
                    <input class="form-control" size="12" type="text" value="" readonly
                           id="startDateField">
                    <span class="input-group-addon"><span
                            class="glyphicon glyphicon-calendar"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                </div>
            </div>

            <div class="col-sm-3">
                <div id="startTimeGroup" class="input-group date form_time"
                     data-date-format="H:ii p" data-link-field="startTime" data-link-format="hh:ii">

                    <input class="form-control" size="8" type="text" value="" readonly
                           id="startTimeField">
                    <span class="input-group-addon"><span
                            class="glyphicon glyphicon-time"></span></span>
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
                     data-date-format="M dd yyyy" data-link-field="endDate"
                     data-link-format="yyyy-mm-dd">

                    <input class="form-control" size="12" type="text" value="" readonly
                           id="endDateField">
                    <span class="input-group-addon"><span
                            class="glyphicon glyphicon-calendar"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                </div>
            </div>

            <div class="col-sm-3">
                <div id="endTimeGroup" class="input-group date form_time"
                     data-date-format="H:ii p" data-link-field="endTime" data-link-format="hh:ii"
                     data-date="">

                    <input class="form-control" size="8" type="text" value="" readonly
                           id="endTimeField">
                    <span class="input-group-addon"><span
                            class="glyphicon glyphicon-time"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                </div>
            </div>

            <input type="hidden" id="endDate" value=""/>
            <input type="hidden" id="endTime" value=""/>

            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="timezoneType">Timezone</label>

            <div class="col-sm-6">
                <select class="form-control" id="timezoneType">
                    <option></option>
                </select>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
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
</#macro>