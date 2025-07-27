SN.Group = {};

SN.Group.factory = {
    getGroup: function (sportsType, sportsSubType) {
        if (sportsType.name === "CRICKET") {
            return SN.Group.cricketGroup;
        }

        return SN.Group.soccerGroup;
    }
};

SN.Group.helper = {
    setupEvents: function(eventId, eventController) {
        $(".addGroupRecord").off().on("click", function() {
            var rootEventId = $("#eventId").val();
            var rootEvent = SN.eventTree.treeMap[rootEventId];
            var groupEvent = SN.eventTree.treeMap[eventId];

            var form = SN.BaseAddEventGroupForm.create(eventController);
            form.initialize();

            form.open(eventId, rootEvent, groupEvent);
        });
    },
    obtainAddAction: function (eventId) {
        return SN.dom.obtainAddAction(eventId, 'addGroupRecord');
    },
    obtainDeleteAction: function (groupId) {
        return SN.dom.obtainDeleteAction(groupId, "deleteGroupRecord");
    },
    obtainEditAction: function (groupId) {
        return SN.dom.obtainEditAction(groupId, "editGroupRecord");
    }
};

SN.Group.soccerGroup = {
    setupEvents: function(eventId) {
        SN.Group.helper.setupEvents(SN.soccerGroupController);

        $(".editGroupRecord").off().on("click", function() {
            SN.console.log('Editing ' + this.dataset.id);
        });

        $(".deleteGroupRecord").off().on("click", function() {
            SN.console.log('Deleting ' + this.dataset.id);
        });

    },

    buildInfo: function (groupNodeList, eventId) {
        return SN.Group.soccerGroup.build(groupNodeList, eventId, false);
    },

    buildInfoEditable: function (groupNodeList, eventId) {
        return SN.Group.soccerGroup.build(groupNodeList, eventId, true);
    },

    build: function (groupNodeList, eventId, editable) {
        var info = '<table class="groupsClass table table-striped table-bordered table-condensed">';
        var addGroup = eventId == undefined ? "" : (" [" + SN.Group.helper.obtainAddAction(eventId) + "]");

        if (!groupNodeList || groupNodeList.length == 0) {
            SN.console.log("No group nodes in event ");
            info += '<tr>' +
                (editable ? ('<th style="width: 50px;">' + addGroup + '</th>') : '') +
                    '</tr>';
            info += "</table>";

            return info;
        }

        var sortedGroups = _.chain(groupNodeList).sortBy('rank').value();

        info += '<tr>' +
            (editable ? ('<th style="width: 50px;">' + addGroup + '</th>') : '') +
            '<th>Team</th>' +
            '<th>Played</th>' +
            '<th class="sn-center">W</th>' +
            '<th class="sn-center">D</th>' +
            '<th class="sn-center">L</th>' +
            '<th class="sn-center">GF</th>' +
            '<th class="sn-center">GA</th>' +
            '<th class="sn-center">GD</th>' +
            '<th>Points</th>' +
            '<th>Qualification</th>' +
            '</tr>';

        _.each(sortedGroups, function (groupNode) {
            var bgColor = "";
            if (groupNode.qualified === 'Qualified') {
                bgColor = "#BBF3BB";
            }

            info += '<tr style="background-color:' + (bgColor !== "" ? (bgColor) : '#ffffff') + ';">';
            if (editable) {
                info += '<td>' + SN.Group.helper.obtainDeleteAction(groupNode.groupId) + ' ' +
                        SN.Group.helper.obtainEditAction(groupNode.groupId) + '</td>';
            }

            info += '<td>' + groupNode.team + '</td>';
            info += '<td class="sn-center">' + groupNode.played + '</td>';
            info += '<td class="sn-right">' + groupNode.won + '</td>';
            info += '<td class="sn-right">' + groupNode.drew + '</td>';
            info += '<td class="sn-right">' + groupNode.lost + '</td>';

            info += '<td class="sn-right">' + groupNode.goalsFor + '</td>';
            info += '<td class="sn-right">' + groupNode.goalsAgainst + '</td>';
            info += '<td class="sn-right">' + groupNode.goalDifference + '</td>';
            info += '<td class="sn-right">' + groupNode.points + '</td>';
            info += '<td>' + groupNode.qualified + '</td>';

            info += '</tr>';
        });

        info += "</table>";

        return info;
    }
};

SN.Group.cricketGroup = {
    setupEvents: function(eventId) {
        SN.Group.helper.setupEvents(SN.cricketGroupController);
    },

    buildInfo: function (groupNodeList, eventId) {
        return SN.Group.cricketGroup.build(groupNodeList, eventId, false);
    },
    buildInfoEditable: function (groupNodeList, eventId) {
        return SN.Group.cricketGroup.build(groupNodeList, eventId, true);
    },

    build: function (groupNodeList, eventId, editable) {
        var info = '<table class="table table-striped table-bordered table-condensed">';
        //Assumption here that eventId is not null
        var addGroup = " [" + SN.Group.helper.obtainAddAction(eventId) + "]";

        if (!groupNodeList || groupNodeList.length == 0) {
            SN.console.log("No group nodes in event " + eventId);
            info += '<tr>' +
                (editable ? ('<th style="width: 50px;">' + addGroup + '</th>') : '') +
                '</tr>';
            info += "</table>";

            return info;
        }

        SN.console.log("Group Node list: " + groupNodeList.length);

        //We do not actually have a Test cricket group league at the international level
        //However first class competitions do have leagues. So need to add abandoned

        info += '<tr>' +
            (editable ? ('<th style="width: 50px;">' + addGroup + '</th>') : '') +
            '<th>Team</th>' +
            '<th class="sn-center">P</th>' +
            '<th class="sn-center">W</th>' +
            '<th class="sn-center">L</th>' +
            '<th class="sn-center">T</th>' +
            '<th class="sn-center">A</th>' +
            '<th class="sn-center">RF</th>' +
            '<th class="sn-center">RA</th>' +
            '<th class="sn-center">NRR</th>' +
            '<th>Points</th>' +
            '<th>Qualified</th>' +
            '</tr>';

        var sortedGroups = _.chain(groupNodeList).sortBy('rank').value();

        _.each(sortedGroups, function (groupNode) {
            var bgColor = "";
            if (groupNode.qualified === "Qualified") {
                bgColor = "#BBF3BB";
            }

            info += '<tr style="background-color:' + (bgColor !== "" ? (bgColor) : '#ffffff') + ';">';
            if (editable) {
                info += '<td>' + SN.Group.helper.obtainDeleteAction(groupNode.groupId) + ' ' +
                    SN.Group.helper.obtainEditAction(groupNode.groupId) + '</td>';
            }
            info += '<td>' + groupNode.team + '</td>';
            info += '<td class="sn-center">' + groupNode.played + '</td>';
            info += '<td class="sn-center">' + groupNode.won + '</td>';
            info += '<td class="sn-center">' + groupNode.lost + '</td>';
            info += '<td class="sn-center">' + groupNode.tied + '</td>';
            info += '<td class="sn-center">' + groupNode.abandoned + '</td>';

            info += '<td class="sn-right">' + groupNode.runsFor + '/' + groupNode.oversFor + '</td>';
            info += '<td class="sn-right">' + groupNode.runsAgainst + '/' + groupNode.oversAgainst + '</td>';
            info += '<td class="sn-right">' + groupNode.nrr.toFixed(2) + '</td>';
            info += '<td class="sn-right">' + groupNode.points + '</td>';
            info += '<td>' + groupNode.qualified + '</td>';

            info += "</tr>";
        });

        info += "</table>";

        return info;
    }
};

