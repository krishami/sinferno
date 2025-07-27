SN.Match = {};

SN.Match.soccerMatch = {
    buildList: function (matchList) {
        if (!matchList || matchList.length == 0) {
            return "";
        }

        var info = '<table class="table table-striped table-bordered table-condensed">';

        _.each(matchList, function (match) {
            var teamProps = SN.Match.helper.obtainTeamProps(match);
            var teamA = teamProps.teamA;
            var teamB = teamProps.teamB;

            info += '<tr>';

            info += '<td width="300" style="text-align: right; color:' + teamA.color + ';' + (teamA.isBold ? "font-weight:bold;" : "") + '">' + teamA.team + '</td>';
            info += '<td width="150" style="text-align: center; font-weight: bold;">' + match.finalResult + '</td>';
            info += '<td width="300" style="color:' + teamB.color + ';' + (teamB.isBold ? "font-weight:bold;" : "") + '">' + teamB.team + '</td>';

            info += '</tr>';

        });

        info += "</table>";

        return info;
    },
    buildEvent: function (event, match) {
        if (!event) return "";

        SN.console.log(JSON.stringify(match));

        var isOvertime = false;
        var isPenalty = false;

        var teamProps = SN.Match.helper.obtainTeamProps(match);
        var teamA = teamProps.teamA;
        var teamB = teamProps.teamB;

        if (match.resultStage === "REGULAR") {
            teamA.displayScore = match.regularTimeScoreA;
            teamB.displayScore = match.regularTimeScoreB;
        }
        else {
            isOvertime = true;
            teamA.displayScore = match.overtimeScoreA + match.regularTimeScoreA;
            teamB.displayScore = match.overtimeScoreB + match.regularTimeScoreB;

            if (match.resultStage !== "OVERTIME" && match.resultStage !== "GOLDEN_GOAL" && match.resultStage !== "SILVER_GOAL") {
                isPenalty = true;
                teamA.penaltyScore = match.suddenDeathA + match.penaltyScoreA;
                teamB.penaltyScore = match.suddenDeathB + match.penaltyScoreB;
            }
        }

        var display = '<h2></h2><table class="table table-bordered table-condensed table-striped">';
        display += '<colgroup span="1" align="center"/><colgroup span="1" align="center"/>';

        display += '<tr>' +
            '<td class="col-md-6" style="text-align:center;color:' + teamA.color + ';"><h3>' + match.teamA + '</h3></td>' +
            '<td class="col-md-6" style="text-align:center;color:' + teamB.color + ';"><h3>' + match.teamB + '</h3></td>' +
            '</tr>';
        display += '<tr>' +
            '<td style="text-align:center;"><h4>' + teamA.displayScore + '</h4></td>' +
            '<td style="text-align:center;"><h4>' + teamB.displayScore + '</h4></td>' +
            '</tr>';

        if (isOvertime || isPenalty) {
            display += '<tr><td colspan="2" style="text-align: center;"><h5>';

            if (!isPenalty) {
                display += 'After Extra Time. Regular Time: (' + match.regularTimeScoreA + ' - ' + match.regularTimeScoreB + ')';
            }
            else {
                if (teamProps.switchScores) {
                    var temp = teamA.penaltyScore;
                    teamA.penaltyScore = teamB.penaltyScore;
                    teamB.penaltyScore = temp;
                }
                display += teamProps.winningTeam + ' won on penalties (' + teamA.penaltyScore + ' - ' + teamB.penaltyScore + ') ';
            }

            display += '</h5></td></tr>';
        }

        display += "</table>";

        if (event.venueName !== "") {
            display += "<p><b>Venue:</b> " + event.venueName + "</p>";
        }

        display += SN.Match.helper.obtainDateSection(event);

        return display;
    },

    buildInfo: function (match) {
        if (!match) return "";

        var info = '<div class="row">';

        var teamProps = SN.Match.helper.obtainTeamProps(match);
        var teamA = teamProps.teamA;
        var teamB = teamProps.teamB;

        info += '<div class="col-sm-3" style="text-align: right; color:' + teamA.color + ';' + (teamA.isBold ? "font-weight:bold;" : "") + '">' + teamA.team + '</div>';
        info += '<div class="col-sm-2" style="text-align: center; font-weight: bold;">' + match.finalResult + '</div>';
        info += '<div class="col-sm-3" style="color:' + teamB.color + ';' + (teamB.isBold ? "font-weight:bold;" : "") + '">' + teamB.team + '</div>';

        info += '</div>';

        return info;
    }
};

SN.Match.cricketMatch = {
    buildList: function (matchList) {
        if (!matchList || matchList.length == 0) {
            return "";
        }

        var info = '<table class="table table-striped table-bordered table-condensed">';

        _.each(matchList, function (match) {
            var teamProps = SN.Match.helper.obtainTeamProps(match);
            var teamA = teamProps.teamA;
            var teamB = teamProps.teamB;

            info += '<tr>';

            info += '<td width="300" style="text-align: right; color:' + teamA.color + ';' + (teamA.isBold ? "font-weight:bold;" : "") + '">' + teamA.team + '</td>';
            info += '<td width="150" style="text-align: center; font-weight: bold;">' + match.finalResult + '</td>';
            info += '<td width="300" style="color:' + teamB.color + ';' + (teamB.isBold ? "font-weight:bold;" : "") + '">' + teamB.team + '</td>';

            info += '</tr>';

        });

        info += "</table>";

        return info;
    },
    obtainInningsDisplay: function (innings, revisedTarget) {
        if (innings == null || innings.score === null) {
            return "DNB";
        }

        var scoreDisplay = innings.score;
        scoreDisplay += (innings.wickets === 10) ? "" : ("/" + innings.wickets);
        scoreDisplay += " (" + innings.overs + ")";

        var revisedTargetDisplay = revisedTarget === null ? "" : " [Revised Target: " + revisedTarget + "] ";

        return scoreDisplay + revisedTargetDisplay;
    },

    buildEvent: function (event, match) {
        if (!event) return "";

        SN.console.log(JSON.stringify(match));

        var teamProps = SN.Match.helper.obtainTeamProps(match);
        var teamA = teamProps.teamA;
        var teamB = teamProps.teamB;

        teamA.displayScore = SN.Match.cricketMatch.obtainInningsDisplay(match.firstInningsA, null);
        teamB.displayScore = SN.Match.cricketMatch.obtainInningsDisplay(match.firstInningsB, match.revisedTargetRuns);

        var display = '<h2></h2><table class="table table-bordered table-condensed table-striped">';
        display += '<colgroup span="1" align="center"/><colgroup span="1" align="center"/>';

        display += '<tr>' +
            '<td class="col-md-6" style="text-align:center;color:' + teamA.color + ';"><h3>' + match.teamA + '</h3></td>' +
            '<td class="col-md-6" style="text-align:center;color:' + teamB.color + ';"><h3>' + match.teamB + '</h3></td>' +
            '</tr>';
        display += '<tr>' +
            '<td style="text-align:center;"><h4>' + teamA.displayScore + '</h4></td>' +
            '<td style="text-align:center;"><h4>' + teamB.displayScore + '</h4></td>' +
            '</tr>';

        var result = "";
        if (teamProps.winningTeam !== "") {
            result = teamProps.winningTeam + " won by " +
                (match.winInningsMargin != null ? (match.winInningsMargin + " innings and ") : "") +
                (match.winRunsMargin != null ? (match.winRunsMargin + " runs") : (match.winWicketsMargin + " wickets"))
        }
        else {
            switch (match.result) {
                case "SCHEDULED":
                    result = "The match has yet to start";
                    break;
                case "DRAW":
                    result = "The match ended in a draw";
                    break;
                case "TIE":
                    result = "The match ended in a tie";
                    break;
                case "ABANDONED":
                    result = "The match was abandoned";
                    break;
                default:
                    result = "Result is unknown";
                    break;
            }
        }

        display += '<tr><td colspan="2" style="text-align: center;"><h5>' + result + "</h5></td></tr>";

        display += "</table>";

        if (event.venueName !== "") {
            display += "<p><b>Venue:</b> " + event.venueName + "</p>";
        }

        display += SN.Match.helper.obtainDateSection(event);

        return display;
    },
    buildInfo: function (match) {
        if (!match) return "";

        var info = '<div class="row">';

        var teamProps = SN.Match.helper.obtainTeamProps(match);
        var teamA = teamProps.teamA;
        var teamB = teamProps.teamB;

        info += '<div class="col-sm-3" style="text-align: right; color:' + teamA.color + ';' + (teamA.isBold ? "font-weight:bold;" : "") + '">' + teamA.team + '</div>';
        info += '<div class="col-sm-2" style="text-align: center; font-weight: bold;">' + match.finalResult + '</div>';
        info += '<div class="col-sm-3" style="color:' + teamB.color + ';' + (teamB.isBold ? "font-weight:bold;" : "") + '">' + teamB.team + '</div>';

        info += '</div>';

        return info;
    }
};

SN.Match.helper = {
    obtainTeamProps: function (match) {
        var teamA = {team: match.teamA, color: "gray"};
        var teamB = {team: match.teamB, color: "gray"};
        var winnerProps = {color: "green", isBold: true};
        var loserProps = {color: "red"};
        var winningTeam = "";
        var switchScores = false;

        if (match.outcome === "FIRST") {
            _.extend(teamA, winnerProps);
            _.extend(teamB, loserProps);
            winningTeam = match.teamA;
        }
        else if (match.outcome === "SECOND") {
            _.extend(teamA, loserProps);
            _.extend(teamB, winnerProps);
            winningTeam = match.teamB;
            switchScores = true;
        }

        return {teamA: teamA, teamB: teamB, winningTeam: winningTeam, switchScores: switchScores};
    },
    obtainDateSection: function (event) {
        var display = "";

        if (event.hasTimeComponent) {
            display += SN.Match.helper.obtainDateDisplay(event.startDate, event.endDate, 'Time', event.timezoneUsed);
            display += SN.Match.helper.obtainDateDisplay(event.userStartDate, event.userEndDate, 'Your Time')
        }
        else {
            display += SN.Match.helper.obtainDateDisplay(event.startDate, event.endDate, 'Date');
        }

        return display;
    },
    obtainDateDisplay: function (startDate, endDate, label, timezoneUsed) {
        var dateDisplay = SN.dom.obtainDateRangeDisplay(startDate, endDate);
        if (dateDisplay === "") {
            return "";
        }

        var timezoneDisplay = !_.isUndefined(timezoneUsed) ? (" (" + timezoneUsed + ")") : "";

        return "<p><b>" + label + "</b>: " + dateDisplay + timezoneDisplay + "</p>";
    }
};

    SN.Match.factory = {
        getMatch: function (sportsType, sportsSubType) {
            if (sportsType.name === "CRICKET") return SN.Match.cricketMatch;
            return SN.Match.soccerMatch;
        }
    };

