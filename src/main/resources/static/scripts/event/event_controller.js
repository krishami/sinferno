$(document).ready(function () {
    SN.controller = {
        GET: "GET",
        POST: "POST",
        DELETE: "DELETE",

        EMPTY: {}
    };

    SN.eventController = {
        PATH: "/event",

        tree: function (eventId, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/tree/" + eventId,
                SN.controller.GET, SN.controller.EMPTY, onSuccess, onFailure);
        },
        single: function (eventId, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/single/" + eventId,
                SN.controller.GET, SN.controller.EMPTY, onSuccess, onFailure);
        },
        listTopLevelEvents: function (onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/top_level",
                SN.controller.GET, SN.controller.EMPTY, onSuccess, onFailure);
        },
        add: function (onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/add",
                SN.controller.GET, SN.controller.EMPTY, onSuccess, onFailure);
        },
        addUnderParent: function (parentId, eventType, onSuccess, onFailure) {
            var data = {parentId: parentId, eventType: eventType};

            //TODO: This avoids path variables and maybe that is not the best way
            //We are not doing JSON.stringify because the method expects individual parameters, not a form
            SN.ajaxHelper.makeCall(this.PATH + "/add", SN.controller.GET, data, onSuccess, onFailure);
        },
        save: function (data, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/save",
                SN.controller.POST, JSON.stringify(data), onSuccess, onFailure);
        },
        edit: function (eventId, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/edit/" + eventId,
                SN.controller.GET, SN.controller.EMPTY, onSuccess, onFailure);
        },
        update: function (data, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/update",
                SN.controller.POST, JSON.stringify(data), onSuccess, onFailure);
        },
        move: function (data, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/move",
                SN.controller.POST, JSON.stringify(data), onSuccess, onFailure);
        },
        delete: function (eventId, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/delete/" + eventId,
                SN.controller.DELETE, SN.controller.EMPTY, onSuccess, onFailure);
        }

    };

    SN.entityToEventController = {
        PATH: "/entity_to_event",

        addUnderEvent: function (eventId, relationship, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/add_under_event/" + eventId + "/" + relationship,
                SN.controller.GET, SN.controller.EMPTY, onSuccess, onFailure);
        },
        listByEvent: function (eventId, relationship, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/list_by_event/" + eventId + "/" + relationship,
                SN.controller.GET, SN.controller.EMPTY, onSuccess, onFailure);
        },
        save: function (data, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/save",
                SN.controller.POST, JSON.stringify(data), onSuccess, onFailure);
        },
        update: function (data, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/update",
                SN.controller.POST, JSON.stringify(data), onSuccess, onFailure);
        },
        delete: function (eventId, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/delete/" + eventId,
                SN.controller.DELETE, SN.controller.EMPTY, onSuccess, onFailure);
        }
    };

    SN.p2e2eController = {
        PATH: "/person_to_entity_to_event",

        add: function (data, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/add",
                SN.controller.GET, data, onSuccess, onFailure);
        },
        save: function (data, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/save",
                SN.controller.POST, JSON.stringify(data), onSuccess, onFailure);
        },
        listByEntityEvent: function (entityEventId, relationship, onSuccess, onFailure) {
            //SN.console.log("Sending data: entityEventId: " + entityEventId + ", relationship: " + relationship);

            SN.ajaxHelper.makeCall(this.PATH + "/list_by_entity_event/" + entityEventId + "/" + relationship,
                SN.controller.GET, SN.controller.EMPTY, onSuccess, onFailure);
        },
        delete: function (p2e2eId, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/delete/" + p2e2eId,
                SN.controller.DELETE, SN.controller.EMPTY, onSuccess, onFailure);
        }

    };

    SN.binaryGroupController = {
        PATH: "/group/binary",

        addUnderEvent: function (eventId, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/add_under_event/" + eventId,
                SN.controller.GET, SN.controller.EMPTY, onSuccess, onFailure);
        }
    };

    SN.soccerGroupController = {
        PATH: "/group/soccer",

        save: function (data, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/save",
                SN.controller.POST, JSON.stringify(data), onSuccess, onFailure);
        }

    };

    SN.cricketGroupController = {
        PATH: "/group/cricket",

        save: function (data, onSuccess, onFailure) {
            SN.ajaxHelper.makeCall(this.PATH + "/save",
                SN.controller.POST, JSON.stringify(data), onSuccess, onFailure);
        }

    };


});