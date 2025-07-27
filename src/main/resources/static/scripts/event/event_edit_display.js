$(document).ready(function () {
    var eventView = {
        "ROUND": SN.eventRound,
        "MATCH": SN.eventMatch
    };

    SN.eventTree = {
        eventTreeContainerClass: ".eventTreeContainer",
        eventTreeSection: "#eventTree",
        treeMap: {},
        sportsType: null,
        sportsSubType: null,

        display: function (response) {
            //SN.console.log(JSON.stringify(response));

            SN.errorDisplay.hide("#errorsDiv");

            SN.eventTree.sportsType = response.sportsType;
            SN.eventTree.sportsSubType = response.sportsSubType;

            var data = [SN.eventTree.processTree(response)]; //Convert to array

            //SN.console.log(JSON.stringify(SN.eventTree.treeMap));

            $(SN.eventTree.eventTreeContainerClass).html("<div id=\"eventTree\" data-toggle=\"context\" data-target=\"#context-menu\"></div>");
            var $tree = $(SN.eventTree.eventTreeSection);

            var rootEventId = $("#eventId").val();
            var rootEvent = SN.eventTree.treeMap[rootEventId];

            var image = "";

            if (rootEvent.sportsType.name == "SOCCER") {
                image = "<img src='/assets/img/soccer_ball.png' width='40' height='40' />";
            }
            else if (rootEvent.sportsType.name == "CRICKET") {
                image = "<img src='/assets/img/cricket_ball.png' width='40' height='40' />";
            }

            $(".page-header").html(image + " " + _.escape(rootEvent.name));

            $tree.tree({
                data: data,
                dragAndDrop: true,
                autoOpen: 4, //Change to zero
                onCreateLi: function (node, $li) {
                    $li.find('.jqtree-element').append(
                        ' <i class="edit fa fa-pencil eventViewIcon" data-node-id="' + node.id + '"></i>'
                    );
                },
                onCanMove: function (node) {
                    //Cannot move root node
                    return !(!node.parent.parent);
                }
            });

            $tree.on('click', '.edit',
                function (e) {
                    var node_id = $(e.target).data('node-id');
                    var node = $tree.tree('getNodeById', node_id);

                    if (node) {
                        SN.eventController.single(node.id, function (event) {
                            SN.console.log(event);

                            eventView[event.eventType.name].display(event);
                            window.scrollTo(0, 0);
                        }, false);
                    }
                }
            );

            $tree.bind(
                'tree.move',
                function (event) {
                    var targetNode = event.move_info.target_node;
                    var targetNodeData = SN.eventTree.treeMap[targetNode.id];
                    var movedNodeData = SN.eventTree.treeMap[event.move_info.moved_node.id];

                    //SN.console.log("Moved Node: " + JSON.stringify(movedNodeData));

                    //Some of the logic in this section is repeated in the Java layer
                    //But we will need it as it would cause UI delays
                    //You should not be able to move a top-level event
                    //Also note that the onCanMove() implements the exact same logic
                    if (movedNodeData.rootId === null || movedNodeData.rootId === "") {
                        SN.console.log("Preventing move because this is a root event: " + movedNodeData.rootId);
                        event.preventDefault();
                        return;
                    }

                    if (event.move_info.position === "inside") {
                        //Trying to move the node to be a child of a match event
                        if (targetNodeData.eventType.name === "MATCH") {
                            SN.console.log("Preventing move because target node is a Match");
                            event.preventDefault();
                            return;
                        }
                    }
                    if (event.move_info.position === "before" || event.move_info.position === "after") {
                        //Trying to move the node to be a sibling of the top-level event
                        if (targetNode.getLevel() === 1) {
                            SN.console.log("Preventing move because target is a sibling of top-level event");
                            event.preventDefault();
                            return;
                        }
                        if (targetNodeData.eventType.name !== movedNodeData.eventType.name) {
                            SN.console.log("Preventing move because sibling is not the same event type");
                            event.preventDefault();
                            return;
                        }

                    }

                    var data = {
                        movedNodeId: event.move_info.moved_node.id,
                        targetNodeId: event.move_info.target_node.id,
                        position: event.move_info.position,
                        previousParentId: event.move_info.previous_parent.id
                    };
                    var successCallback = function (response) {
                        //SN.console.log(JSON.stringify(response));
                        var eventId = $("#eventId").val();
                        SN.eventTree.displayTree(eventId);
                    };

                    var failureCallback = function () {
                        var eventId = $("#eventId").val();
                        SN.eventTree.displayTree(eventId);
                    };

                    SN.console.log("Sending data to move: " + JSON.stringify(data));
                    SN.eventController.move(data, successCallback, failureCallback);
                }
            );

        },

        processTree: function (node) {
            SN.eventTree.treeMap[node.eventId] = node;

            var childEventTypes = {};
            var currentNode = {label: node.name, id: node.eventId};
            _.each(node.children, function (child) {
                //Create a new element for the current node so that we can add children
                if (!currentNode.children) {
                    currentNode.children = [];
                }

                //Add the new node as a child of the current node
                currentNode.children.push(SN.eventTree.processTree(child));

                var childType = child.eventType.name;

                if (childEventTypes[childType]) {
                    childEventTypes[childType]++;
                }
                else {
                    childEventTypes[childType] = 1;
                }
            });

            if (_.keys(childEventTypes).length != 0) {
                node.childTypes = childEventTypes;
            } else {
                node.childTypes = {};
            }

            return currentNode;
        },

        displayTree: function (eventId, callback) {
            SN.console.log("Calling obtainData with " + eventId);

            var successCallback = function (response) {
                //SN.console.log("About to display tree");
                SN.eventTree.display(response);
                if (callback) {
                    callback();
                }
            };

            SN.eventController.tree(eventId, successCallback, false);
        }
    };

    var form = SN.eventForm;
    form.initialize();

    SN.ajaxHelper.makeCall("/timezone/list", "GET", {}, function (data) {
        var fields = [{field: form.TIMEZONE, values: data, display: false}];
        form.populate(fields);
    });

    var eventId = $("#eventId").val();
    SN.eventTree.displayTree(eventId, function () {
        //Display the top-level event when it launches
        //We may need to override this with the particular event that we are trying to display
        SN.eventController.single(eventId, function (event) {
            SN.eventRound.display(event);
        }, false);
    });

    $("#cancelBtn").off().on("click", function () {
        SN.eventWorkArea.displayView();
        window.scrollTo(0, 0);
    });
});
