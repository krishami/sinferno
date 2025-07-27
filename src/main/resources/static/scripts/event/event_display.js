$(document).ready(function () {

    SN.tournament = {
        matchDisplay: null,
        groupDisplay: null,
        tournamentContents: "",

        display: function (response) {
            SN.console.log("Time elapsed from Ajax call to return: " + SN.timer.elapsed());

            SN.console.log(JSON.stringify(response));

            SN.errorDisplay.hide("#errorsDiv");

            var sportsType = response.sportsType;
            var sportsSubType = response.sportsSubType;

            this.matchDisplay = SN.Match.factory.getMatch(sportsType, sportsSubType);
            this.groupDisplay = SN.Group.factory.getGroup(sportsType, sportsSubType);
            this.tournamentContents = "";

            this.processTree(null, response, 1);

            $("#tournament").html(this.tournamentContents);

            //We should have the heading and HTML title set to this.
            //However because we are looping through the tree, it also prints the tournament name again
            //and hence it appears twice. Need to fix that.
            //$(".page-header").html(_.escape(response.name));

            SN.console.log("Time elapsed to process tree: " + SN.timer.elapsed());
        },

        processTree: function (parent, node, level) {
            this.tournamentContents += this.processNode(parent, node, level);
            _.each(node.children, function (child) {
                SN.tournament.processTree(node, child, level + 1);
            });
        },

        processNode: function (parent, data, level) {
            var info = "";

            if (data.eventType.name === "ROUND") {
                var heading = "h" + (level + 1);

                info = "<" + heading + ">" + data.name + "</" + heading + ">";

                if (data.treatAsGroup) {
                    info += this.groupDisplay.buildInfo(data.groupNodeList);
                    info += this.matchDisplay.buildList(data.matchNodeList);
                }
            }
            else {
                if (data.match) {
                    if (parent && !parent.treatAsGroup) {
                        info = this.matchDisplay.buildList([data.match]);
                    }
                }
                else {
                    //We will need this when no match data is entered
                    //though in practice, we will force match data to be entered
                    info = "<h4>" + data.name + "</h4>";
                }
            }

            return info;
        },

        displayTournament: function (eventId) {
            $("#tournament").html("");

            SN.timer.reset();

            SN.ajaxHelper.makeCall("/event/tree/" + eventId, "GET", {}, function (response) {
                SN.tournament.display(response);
            });
        }
    };

    SN.tournament.displayTournament($("#eventId").val());

});