SN.eventWorkArea = {
    ADD_ROUND: "#addRound",
    ADD_MATCH: "#addMatch",

    CARDS: [
        "#eventDisplay", "#eventEdit", "#eventGroupAdd"
    ],

    displayCard: function(cardName) {
        SN.errorDisplay.hide("#errorsDiv");
        _.each(SN.eventWorkArea.CARDS, function (card) {
            SN.dom.toggleView(card, card === cardName);
        });
    },

    displayView: function (eventDetailsHtml) {
        SN.eventWorkArea.displayCard("#eventDisplay");
        if (eventDetailsHtml) {
            $("#eventDetails").html(eventDetailsHtml);
        }
    },
    displayEdit: function () {
        SN.eventWorkArea.displayCard("#eventEdit");
    },
    displayAddGroup: function() {
        SN.errorDisplay.hide("#errorsDiv");
        SN.eventWorkArea.displayCard("#eventGroupAdd");
    },
    hideButtons: function (buttons) {
        _.each(buttons, function (button) {
            $(button).hide();
            $(button).off();
        });
    },
    showButtons: function (buttons) {
        _.each(buttons, function (button) {
            $(button).show();
        });
    },
    toggleButtons: function (childTypes, defaultButtons) {
        var workArea = SN.eventWorkArea;
        var allButtons = [workArea.ADD_ROUND, workArea.ADD_MATCH];

        if (_.isUndefined(childTypes) || _.isNull(childTypes) || childTypes.length === 0) {
            workArea.showButtons(defaultButtons);
            workArea.hideButtons(_.difference(allButtons, defaultButtons));
            return;
        }

        var buttonsToShow = [];
        var eventTypeToButton = {
            "ROUND": workArea.ADD_ROUND,
            "MATCH": workArea.ADD_MATCH
        };
        _.each(_.keys(childTypes), function (eventType) {
            if (eventTypeToButton[eventType]) {
                buttonsToShow.push(eventTypeToButton[eventType]);
            }
        });

        if (buttonsToShow.length === 0) {
            buttonsToShow = defaultButtons;
        }

        workArea.showButtons(buttonsToShow);
        workArea.hideButtons(_.difference(allButtons, buttonsToShow));
    },
    onClickOfAddRound: function (onClick) {

    }

};
