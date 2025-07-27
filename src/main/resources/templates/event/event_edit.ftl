<#-- @ftlvariable name="" type="com.sinferno.view.sportsEvent.EventEditView" -->

<#include "macros/event_display_div.ftl" encoding="Shift_JIS">
<#include "macros/event_edit_div.ftl" encoding="Shift_JIS">
<#include "macros/event_add_group_entry_div.ftl" encoding="Shift_JIS">

<#-- Cannot include edit without changing ids of input fields -->
<#--<#include "macros/event_edit_group_entry_div.ftl" encoding="Shift_JIS">-->

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
            <h1 class="page-header"></h1>


            <div class="alert" id="errorsDiv" class="blockHide" style="color:red;"></div>
            <div class="alert alert-success blockHide" id="successDiv" role="alert"></div>

            <div class="row">
                <div class="col-md-4 eventTreeContainer">
                    <div id="eventTree" data-toggle="context" data-target="#context-menu">
                    </div>
                </div>
                <div class="col-md-8 eventWorkAreaContainer" id="eventWorkArea">
                    <@eventDisplayDiv/>
                    <@eventEditDiv/>
                    <@eventAddGroupEntryDiv/>
                </div>
            </div>

        </div>

    </div>
</div>

<!-- Modal -->
<div id="teamPlayersModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><span id="teamPlayersModalHeading">Players</span>
                    <button type="button" class="btn btn-primary" id="addTeamPlayersBtn">Add Player</button>
                </h4>
            </div>

            <div class="modal-body" id="teamPlayersTableDiv">
                <div style="height: 25em; overflow-y: scroll; overflow-x: auto;" id="teamPlayersList">
                </div>
                <div style="height: 25em; overflow-y: auto; overflow-x: auto;" id="teamPlayersAdd" class="blockHide">

                    <form role="form">
                        <div class="form-group">
                            <label class="control-label" id="teamPlayersAddHeading">Choose one of the following
                                options</label>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="p2e2ePlayerEntityId">Select a player from the Team</label>
                            <select id="p2e2ePlayerEntityId" class="form-control">
                                <option></option>
                            </select> &nbsp;
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="p2e2ePlayerId">Select another player</label>
                            <select id="p2e2ePlayerId" class="form-control">
                                <option></option>
                            </select> &nbsp;
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="p2e2ePlayerName">Enter a new player</label>
                            <input type="text" id="p2e2ePlayerName" class="form-control"/>
                            <span class="help-block"></span>
                        </div>
                    </form>
                </div>
            </div>

            <div class="modal-footer">
                <div id="viewTeamPlayersButtons">
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="closeTeamPlayersBtn">Close
                    </button>
                </div>
                <div id="addTeamPlayersButtons" class="blockHide">
                    <button type="button" class="btn btn-default" id="cancelP2e2eBtn">Cancel</button>
                    &nbsp;
                    <button type="button" class="btn btn-primary" id="saveP2e2eBtn">Add</button>
                </div>
            </div>
        </div>

    </div>
</div>

<input type="hidden" id="eventId" value="${eventId}"/>

${js}

</body>
</html>
