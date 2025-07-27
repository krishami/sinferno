SN.entityToEvent = {
    view: {
        obtainAddAction: function (eventId) {
            return '<a href="#">' +
                '<span class="glyphicon glyphicon-plus addEntityToEventRecord" data-id="' + eventId + '">' +
                '</span></a>';
        },
        obtainDeleteAction: function (recordId) {
            return SN.dom.obtainDeleteAction(recordId, "deleteEntityToEventRecord");
        },
        obtainViewTeamPlayersAction: function (recordId, recordDisplay) {
            return '<a href="#"><span class="viewTeamPlayers" data-id="' + recordId + '">' + recordDisplay + '</span></a>';
        },
        refresh: function (eventId) {
            SN.entityToEventController.listByEvent(eventId, "TEAM", function (response) {
                SN.entityToEvent.view.display("#teams", eventId, response);
            });
        },

        add: function (eventId, MAX_COLUMNS) {
            //Max columns is needed because we are adding a new row and we need it to span all columns
            //This probably wouldn't be required if we were not using tables.
            SN.console.log("Adding a new team for eventId: " + eventId);

            SN.entityToEventController.addUnderEvent(eventId, "TEAM", function (response) {
                var TEAMS_FIELD = "entityId";

                //Check if row is already open
                if ($("#" + TEAMS_FIELD).length) {
                    SN.console.log("Add section already open");
                    return;
                }

                var cellBody = '<form class="form-horizontal" role="form">' +
                    '<div class="form-group">' +
                    '  <label class="control-label col-sm-2" for="' + TEAMS_FIELD + '">Team</label>' +
                    '  <div class="col-sm-6" style="height: 1em;">' +
                    '    <select id="' + TEAMS_FIELD + '" class="form-control"><option></option></select> &nbsp; ' +
                    '  </div>' +
                    '  <span class="help-block col-sm-2 blockHide"></span>' +
                    '</div>' +
                    '<div class="col-sm-12" style="text-align: right;">' +
                    '  <button type="button" class="btn btn-default" id="cancelTeamBtn">Cancel</button>' +
                    '  &nbsp; ' +
                    '  <button type="button" class="btn btn-primary" id="saveTeamBtn">Add</button> ' +
                    '</div>' +
                    '</form>';

                $('#teamsHeading').after('<tr><td colspan="' + MAX_COLUMNS + '" id="addTeamRow">' + cellBody + '</td></tr>');

                SN.dom.populateSelectizeDropdowns([
                    {field: '#' + TEAMS_FIELD, values: response.entities}
                ]);

                $("#cancelTeamBtn").off().on("click", function () {
                    $('#addTeamRow').remove();
                    $(".teamsClass tr:odd").css("background-color", "#f0f0f0");
                    $(".teamsClass tr:even").css("background-color", "#ffffff");
                });

                $("#saveTeamBtn").off().on("click", function () {
                    var entityId = SN.dom.getFieldValue({type: SN.dom.DROPDOWN, id: '#' + TEAMS_FIELD});

                    var data = {
                        entityId: entityId,
                        eventId: eventId,
                        relationshipType: "TEAM"
                    };

                    SN.console.log("Sending data for save: " + JSON.stringify(data));

                    SN.entityToEventController.save(data, function (response) {
                        $('#addTeamRow').remove();
                        SN.entityToEvent.view.refresh(eventId);
                    });

                });
            })
        },
        delete: function (eventId, recordId) {
            var deleteRelationship = function (relationId) {
                SN.entityToEventController.delete(relationId, function (response) {
                    SN.entityToEvent.view.refresh(eventId);
                });
            };

            bootbox.confirm("Are you sure you want to delete this record?", function (result) {
                if (result == true) {
                    deleteRelationship(recordId);
                }
            });
        },
        viewTeamPlayers: function (entityEventId) {
            SN.p2e2e.view.refresh(entityEventId);
        },

        display: function (element, eventId, associatedEntities) {
            var view = SN.entityToEvent.view;

            var MAX_COLUMNS = 4;
            var count = associatedEntities.length;

            if (count <= 8) {
                MAX_COLUMNS = 1;
            }

            associatedEntities = _.sortBy(associatedEntities, function (entity) {
                return entity.entityName;
            });

            var display = '<table class="teamsClass" style="width:400px;">';
            display += '<tr id="teamsHeading"><th colspan="' + MAX_COLUMNS + '"><h5>Teams [' +
                view.obtainAddAction(eventId) +
                ']</h5></th></tr>';

            var column = 0;
            _.each(associatedEntities, function (entity) {
                if (column == 0) {
                    display += "<tr>";
                }
                display += '<td>' + view.obtainDeleteAction(entity.id) + " " +
                    view.obtainViewTeamPlayersAction(entity.id, _.escape(entity.entityName)) +
                    "</td>";

                column++;

                if (column == MAX_COLUMNS) {
                    display += "</tr>";
                    column = 0;
                }
            });

            while (column != 0) {
                display += "<td>&nbsp;</td>";
                if (++column == MAX_COLUMNS) {
                    display += "</tr>";
                    break;
                }
            }

            display += "</table>";

            $(element).html(display);

            $(".addEntityToEventRecord").off().on("click", function () {
                view.add(this.dataset.id, MAX_COLUMNS);
            });

            $(".deleteEntityToEventRecord").off().on("click", function () {
                view.delete(eventId, this.dataset.id);
            });

            $(".viewTeamPlayers").off().on("click", function () {
                view.viewTeamPlayers(this.dataset.id);
            });
        }
    }
};