<#macro eventAddGroupEntryDiv>
<div id="eventGroupAdd" class="blockHide">
    <div class="col-sm-12" style="margin-bottom: 0.3in;">
        <h2 class="col-sm-8" id="eventGroupAddAction" style="text-align: center;"></h2>

        <p>&nbsp;</p>
    </div>

    <form class="form-horizontal" role="form" id="eventGroupFrom">
        <input type="hidden" id="egEventId" value="" />

        <div class="form-group">
            <label class="control-label col-sm-2" for="egTeam">Team</label>
            <div class="col-sm-6">
                <select id="egTeam" class="form-control">
                    <option></option>
                </select>
            </div>

            <span class="help-block"></span>
        </div>

        <div class="col-sm-8" style="text-align: right;">
            <button type="button" class="btn btn-default" id="cancelAddEgBtn">Cancel</button>
            <button type="button" class="btn btn-primary" id="saveAddEgBtn">Save</button>
        </div>
    </form>
</div>
</#macro>