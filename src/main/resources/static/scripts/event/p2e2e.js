SN.p2e2e = {
    view: {
        toggleListMode: function (showList) {
            $("#viewTeamPlayersButtons,#addTeamPlayersBtn,#teamPlayersList").toggleClass("blockHide", !showList);
            $("#addTeamPlayersButtons,#teamPlayersAdd").toggleClass("blockHide", showList);
        },
        clear: function () {
            SN.errorDisplay.hide("#errorsDiv");
            $("#successDiv").hide();

            $(".form-group").removeClass("has-error");
            $(".form-group .help-block").html("");
        },
        add: function (entityToEvent) {
            SN.console.log("Adding a new player for entityEventId: " + entityToEvent.id);

            var requestData = {
                entityEventId: entityToEvent.id,
                relationship: "PLAYER",
                entityEventRelationship: "TEAM",
                personEntityRelationship: "PLAYER"
            };

            SN.p2e2eController.add(requestData, function (response) {
                SN.p2e2e.view.clear();
                SN.p2e2e.view.toggleListMode(false);

                $("#p2e2ePlayerName").val("");

                SN.dom.populateSelectizeDropdowns([
                    {field: '#p2e2ePlayerEntityId', values: response.personsToEntity},
                    {field: '#p2e2ePlayerId', values: response.persons}
                ]);

                var showPlayerEntityDropdown = (response.personsToEntity.length !== 0);
                var showPlayerDropdown = (response.persons.length !== 0);

                SN.dom.toggleFieldView('#p2e2ePlayerEntityId', showPlayerEntityDropdown);
                SN.dom.toggleFieldView('#p2e2ePlayerId', showPlayerDropdown);

                SN.dom.toggleFieldView("#teamPlayersAddHeading", showPlayerEntityDropdown || showPlayerDropdown);

                $("#cancelP2e2eBtn").off().on("click", function () {
                    SN.p2e2e.view.toggleListMode(true);
                });

                $("#saveP2e2eBtn").off().on("click", function () {
                    SN.p2e2e.view.clear();

                    var data = {
                        entityEventId: entityToEvent.id,
                        personEntityId: SN.dom.getSelectizeDropdownValue('#p2e2ePlayerEntityId'),
                        personId: SN.dom.getSelectizeDropdownValue('#p2e2ePlayerId'),
                        personName: SN.dom.getTextbox('#p2e2ePlayerName'),
                        relationshipType: "PLAYER",
                        personEntityRelationship: "PLAYER"
                    };

                    SN.console.log("Sending data for save: " + JSON.stringify(data));

                    SN.p2e2eController.save(data, function (response) {
                        SN.console.log("p2e2e Save Response: " + JSON.stringify(response));

                        SN.p2e2e.view.refresh(entityToEvent.id);
                    });

                });
            })
        },

        obtainDeleteAction: function (recordId) {
            return SN.dom.obtainDeleteAction(recordId, "deleteP2e2eRecord");
        },
        refresh: function (entityEventId) {
            SN.p2e2eController.listByEntityEvent(entityEventId, "PLAYER", function (p2e2eList) {
                SN.p2e2e.view.display(entityEventId, p2e2eList);
            });
        },

        delete: function (entityEventId, recordId) {
            var deleteRelationship = function (relationId) {
                SN.p2e2eController.delete(relationId, function (response) {
                    SN.p2e2e.view.refresh(entityEventId);
                });
            };

            bootbox.confirm("Are you sure you want to delete this record?", function (result) {
                if (result === true) {
                    deleteRelationship(recordId);
                }
            });
        },

        display: function (entityEventId, p2e2eList) {
            var playerListDiv = $("#teamPlayersList");
            playerListDiv.html("");

            var entityToEvent = p2e2eList.entityToEvent;
            var heading = entityToEvent.entityName + " Squad for " + entityToEvent.eventName;

            var p2e2eRecords = _.sortBy(p2e2eList.nodes, function (p2e2eRecord) {
                return p2e2eRecord.personName;
            });

            if (p2e2eRecords.length) {
                var display = '<div class="list-group teamPlayersClass" style="width:100%">';

                _.each(p2e2eRecords, function (p2e2eRecord) {
                    display += '<li class="list-group-item">' +
                        SN.p2e2e.view.obtainDeleteAction(p2e2eRecord.id) + " &nbsp; " +
                        _.escape(p2e2eRecord.personName) +
                        '</li>';
                });

                display += "</div>";
                playerListDiv.html(display);
            }
            else {
                playerListDiv.html(entityToEvent.entityName + " has no players for " + entityToEvent.eventName);
            }

            SN.p2e2e.view.toggleListMode(true);
            $("#teamPlayersModalHeading").html(heading);
            $("#teamPlayersModal").modal("show");

            $("#addTeamPlayersBtn").off().on("click", function () {
                SN.p2e2e.view.add(entityToEvent);
            });

            $(".deleteP2e2eRecord").off().on("click", function () {
                SN.p2e2e.view.delete(entityEventId, this.dataset.id);
            });

        }
    }

};