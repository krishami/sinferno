<#macro eventEditGroupEntryDiv>
<div id="eventGroupEdit" class="blockHide">
    <div class="col-sm-12" style="margin-bottom: 0.3in;">
        <h2 id="eventGroupAction" style="text-align: center;"></h2>

        <p>&nbsp;</p>
    </div>

    <form class="form-horizontal" role="form" id="eventGroupFrom">
        <input type="hidden" id="egEventId" value="" />

        <h6 style="margin-left:0.1in;">Please choose either result or team</h6>

        <div class="form-group">
        <#-- teamSelectedEventId -->
            <label class="control-label col-sm-2" for="egSelectedEvent">Result Of</label>
            <div class="col-sm-6">
                <select id="egSelectedEvent" class="form-control">
                    <option></option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" >&nbsp;</label>

            <div class="col-sm-6">
            <#-- teamSelectedType and teamSelectedRank -->
                <select id="egSelectedTypeRank" class="form-control">
                    <option></option>
                </select>
            </div>
            <span class="help-block"></span>
        </div>

        <div class="form-group">
            <label class="control-label col-sm-2" for="egTeam">OR Team</label>
            <div class="col-sm-6">
                <select id="egTeam" class="form-control">
                    <option></option>
                </select>
            </div>

            <span class="help-block"></span>
        </div>
        <div class="form-group" class="blockHide">
            <div class="col-sm-5">
                <label class="control-label" id="actualTeam" style="color:#cccccc;"></label>
            </div>
        </div>

        <hr/>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egDetailsOverride">&nbsp;</label>
            <div class="col-sm-6">
                <input type="checkbox" id="egDetailsOverride" />
                <label class="control-label" for="egDetailsOverride">Override Details</label>
            </div>
            <span class="help-block"></span>
        </div>

        <div class="form-group">
            <label class="control-label col-sm-2" for="egPlayed">Played</label>
            <div class="col-sm-2">
                <input type="text" id="egPlayed" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egWon">Won</label>
            <div class="col-sm-2">
                <input type="text" id="egWon" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egLost">Lost</label>
            <div class="col-sm-2">
                <input type="text" id="egLost" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egDrew">Drew</label>
            <div class="col-sm-2">
                <input type="text" id="egDrew" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egTied">Tied</label>
            <div class="col-sm-2">
                <input type="text" id="egTied" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egAbandoned">Abandoned</label>
            <div class="col-sm-2">
                <input type="text" id="egAbandoned" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egPoints">Points</label>
            <div class="col-sm-2">
                <input type="text" id="egPoints" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egGoalsFor">Goals For</label>
            <div class="col-sm-2">
                <input type="text" id="egGoalsFor" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egGoalsAgainst">Goals Against</label>
            <div class="col-sm-2">
                <input type="text" id="egGoalsAgainst" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egRunsFor">Runs For</label>
            <div class="col-sm-2">
                <input type="text" id="egRunsFor" class="form-control"/>
            </div>
            <label class="control-label col-sm-1" for="egOversFor">Overs</label>
            <div class="col-sm-2">
                <input type="text" id="egOversFor" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egRunsAgainst">Runs Against</label>
            <div class="col-sm-2">
                <input type="text" id="egRunsAgainst" class="form-control"/>
            </div>
            <label class="control-label col-sm-1" for="egOversAgainst">Overs</label>
            <div class="col-sm-2">
                <input type="text" id="egOversAgainst" class="form-control"/>
            </div>

            <span class="help-block"></span>
        </div>

        <hr/>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egQualifiedOverride">&nbsp;</label>
            <div class="col-sm-6">
                <input type="checkbox" id="egQualifiedOverride" />
                <label class="control-label" for="egQualifiedOverride">Override Qualification Details</label>
            </div>
            <span class="help-block"></span>
        </div>

        <div class="form-group">
            <label class="control-label col-sm-2" for="egRank">Rank</label>
            <div class="col-sm-2">
                <input type="text" id="egRank" class="form-control"/>
            </div>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="egQualified">&nbsp;</label>
            <div class="col-sm-8">
                <input type="checkbox" id="egQualified">
                <label class="control-label" for="egQualified">Qualified</label>
            </div>
            <span class="help-block"></span>
        </div>

        <hr/>

        <div class="form-group">
            <label class="control-label col-sm-2" for="description">Notes</label>

            <div class="col-sm-6">
                <textarea class="form-control" id="description" placeholder="" rows="4"></textarea>
            </div>
            <span class="help-block"></span>
        </div>

        <div class="col-sm-8" style="text-align: right;">
            <button type="button" class="btn btn-default" id="cancelEgBtn">Cancel</button>
            <button type="button" class="btn btn-primary" id="saveEgBtn">Save</button>
        </div>
    </form>
</div>
</#macro>