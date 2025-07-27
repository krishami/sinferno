SN.BaseGroupForm = {};

//This corresponds to the standard form that is being displayed
//We will have to create a sports specific form for the group
SN.BaseGroupForm.create = function() {
    var form = SN.StandardForm.create();

    //Note that the name of the attributes are not the same as the actual field name
    //Rest assured - we have it under control
    var attributes = {
        EVENT_ID: "eventId", //PK - will need during edit mode
        
        TEAM_ID: "teamId",
        SELECTED_EVENT_ID: "selectedEvent",
        SELECTED_RESULT: "selectedResult", //This could be either type or rank
        
        PLAYED: "played",
        WON: "won",
        DREW: "drew",
        TIED: "tied",
        ABANDONED: "abandoned",
        LOST: "lost",
        POINTS: "points",
        
        GOALS_FOR: "goalsFor",
        GOALS_AGAINST: "goalsAgainst",
        
        RUNS_FOR: "runsFor",
        OVERS_FOR: "oversFor",
        
        RUNS_AGAINST: "runsAgainst",
        OVERS_AGAINST: "oversAgainst",
        
        RANK: "rank",
        QUALIFIED: "qualified",

        DETAILS_OVERRIDE: "detailsOverride",
        QUALIFIED_OVERRIDE: "qualifiedOverride"
    };

    form = _.extend(form, attributes);

    var dom = SN.dom;

    var fields = {};

    //Event id should be the only readonly value by default
    fields[form.EVENT_ID] = {id: "#egEventId", type: SN.dom.HIDDEN, ignoreZero: true};

    fields[form.TEAM_ID] = {id: "#egTeam", type: SN.dom.DROPDOWN};
    fields[form.SELECTED_EVENT_ID] = {id: "#egSelectedEvent", type: SN.dom.DROPDOWN};
    fields[form.SELECTED_RESULT] = {id: "#egSelectedResult", type: SN.dom.DROPDOWN};

    fields[form.PLAYED] = {id: "#egPlayed", type: SN.dom.TEXTBOX};
    fields[form.WON] = {id: "#egWon", type: SN.dom.TEXTBOX};
    fields[form.LOST] = {id: "#egLost", type: SN.dom.TEXTBOX};
    fields[form.POINTS] = {id: "#egPoints", type: SN.dom.TEXTBOX};

    fields[form.DREW] = {id: "#egDrew", type: SN.dom.TEXTBOX, display: false};
    fields[form.TIED] = {id: "#egTied", type: SN.dom.TEXTBOX, display: false};
    fields[form.ABANDONED] = {id: "#egAbandoned", type: SN.dom.TEXTBOX, display: false};

    fields[form.GOALS_FOR] = {id: "#egGoalsFor", type: SN.dom.TEXTBOX, display: false};
    fields[form.GOALS_AGAINST] = {id: "#egGoalsAgainst", type: SN.dom.TEXTBOX, display: false};
    fields[form.RUNS_FOR] = {id: "#egRunsFor", type: SN.dom.TEXTBOX, display: false};
    fields[form.OVERS_FOR] = {id: "#egOversFor", type: SN.dom.TEXTBOX, display: false};
    fields[form.RUNS_AGAINST] = {id: "#egRunsAgainst", type: SN.dom.TEXTBOX, display: false};
    fields[form.OVERS_AGAINST] = {id: "#egOversAgainst", type: SN.dom.TEXTBOX, display: false};

    fields[form.RANK] = {id: "#egRank", type: SN.dom.TEXTBOX};
    fields[form.QUALIFIED] = {id: "#egQualified", type: SN.dom.CHECKBOX};

    fields[form.DETAILS_OVERRIDE] = {id: "#egDetailsOverride", type: SN.dom.CHECKBOX};
    fields[form.QUALIFIED_OVERRIDE] = {id: "#egQualifiedOverride", type: SN.dom.CHECKBOX};

    form.fields = fields;

    form.initialize = function () {
        return form.init();
    };

    form.handleCommonCustomEvents = function (model) {
        //TODO: Code to handle details override and qualified override
    };

    return form;
};


