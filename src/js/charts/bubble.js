/*global define*/
define([
    "fenix-ui-bridge",
    "d3",
    "underscore",
    "../charts/valueFormatter",
    "../../config/readyToUse/config",
    "../../html/readyToUse/charts/bubbleTooltip.hbs"
], function (Bridge, d3, _, Formatter, RC, tooltipTemplate) {

    "use strict";

    function Bubble(opts) {

        this.bridge = new Bridge({
            cache: opts.cache,
            environment: opts.environment
        });

        this.type = opts.type.toLowerCase();
        this.el = opts.el;
        this.holderEl = $(opts.holderEl);
        this.lang = opts.lang || "EN";

        this.channels = {};

        this.process = opts.process;

        //get processed resource
        // keep track of which params are passed
        this.bridge.getProcessedResource({
            body: this._getBody(),
            params: {
                language: this.lang.toUpperCase()
            }
        }).then(
            _.bind(this._onGetProcessedResourceSuccess, this),
            function (error) {
                alert("impossible to load data");
                console.log(error)
            }
        );
    }

    Bubble.prototype.redraw = function () {

    };

    Bubble.prototype._getBody = function () {

        var body;

        switch (this.type) {
            case "foods":

                body = [

                    {
                        "name": "filter",
                        "parameters": {
                            "columns": [
                                "group_code",
                                "subgroup_code",
                                "foodex2_code",
                                "value",
                                "um"
                            ],
                            "rows": {
                                "!group_code": {
                                    "codes": [
                                        {
                                            "uid": "GIFT_FoodGroups",
                                            "codes": ["14"]
                                        }
                                    ]
                                }
                            }
                        }
                    },

                    {
                        "name": "group",
                        "rid": {"uid": "food_food"},
                        "result": true,
                        "parameters": {
                            "by": [
                                "group_code",
                                "subgroup_code",
                                "foodex2_code"
                            ],
                            "aggregations": [
                                {
                                    "columns": ["value"],
                                    "rule": "SUM"
                                },
                                {
                                    "columns": ["um"],
                                    "rule": "max"
                                }
                            ]
                        }
                    },

                    {
                        "name": "group",
                        "rid": {"uid": "food_subgroup"},
                        "result": true,
                        "parameters": {
                            "by": [
                                "group_code",
                                "subgroup_code"
                            ],
                            "aggregations": [
                                {
                                    "columns": ["value"],
                                    "rule": "SUM"
                                },
                                {
                                    "columns": ["um"],
                                    "rule": "max"
                                }
                            ]
                        }
                    },

                    {
                        "name": "group",
                        "rid": {"uid": "food_group"},
                        "parameters": {
                            "by": [
                                "group_code"
                            ],
                            "aggregations": [
                                {
                                    "columns": ["value"],
                                    "rule": "SUM"
                                },
                                {
                                    "columns": ["um"],
                                    "rule": "max"
                                }
                            ]
                        }
                    }

                ];

                break;
            case "beverages":

                body = [

                    {
                        "name": "filter",
                        "parameters": {
                            "columns": [
                                "group_code",
                                "subgroup_code",
                                "foodex2_code",
                                "value",
                                "um"
                            ],
                            "rows": {
                                "group_code": {
                                    "codes": [
                                        {
                                            "uid": "GIFT_FoodGroups",
                                            "codes": ["14"]
                                        }
                                    ]
                                }
                            }
                        }
                    },

                    {
                        "name": "group",
                        "rid": {"uid": "food_food"},
                        "result": true,
                        "parameters": {
                            "by": [
                                "group_code",
                                "subgroup_code",
                                "foodex2_code"
                            ],
                            "aggregations": [
                                {
                                    "columns": ["value"],
                                    "rule": "SUM"
                                },
                                {
                                    "columns": ["um"],
                                    "rule": "max"
                                }
                            ]
                        }
                    },

                    {
                        "name": "group",
                        "rid": {"uid": "food_subgroup"},
                        "parameters": {
                            "by": [
                                "group_code",
                                "subgroup_code"
                            ],
                            "aggregations": [
                                {
                                    "columns": ["value"],
                                    "rule": "SUM"
                                },
                                {
                                    "columns": ["um"],
                                    "rule": "max"
                                }
                            ]
                        }
                    }
                ];
                break
        }

        body.unshift(this.process);

        return body;
    };

    Bubble.prototype._onGetProcessedResourceSuccess = function (data) {

        var model = this._buildModel(data);

        this._render(model);

        this._trigger("ready");

    };

    Bubble.prototype._buildModel = function (raw) {

        switch (this.type) {
            case "foods":
                return this._buildFoodsModel(raw);
                break;
            case "beverages":
                return this._buildBeveragesModel(raw);
                break
        }
    };

    Bubble.prototype._buildFoodsModel = function (raw) {

        var colors = RC["bubbleChartColors_" + this.type].slice(0) || [],
            lang = this.lang.toUpperCase(),
            data = raw || {},
            resourceGroups = data.food_group || {},
            resourceSubgroups = data.food_subgroup || {},
            resourceFoods = data.food_food || {},
            metadataGroups = resourceGroups.metadata || {},
            metadataSudgroups = resourceSubgroups.metadata || {},
            metadataFoods = resourceFoods.metadata || {},
            groups = resourceGroups.data || [],
            subgroups = resourceSubgroups.data || [],
            foods = resourceFoods.data || [],
            groupsColumns2Details = getGroupColumnsDetails(metadataGroups),
            subgroupsColumns2Details = getGroupColumnsDetails(metadataSudgroups),
            foodsColumns2Details = getGroupColumnsDetails(metadataFoods),
            children = [];

        _.each(groups, function (g) {
            addGroups(g, groupsColumns2Details, children);
        });

        _.each(subgroups, function (s) {
            addSubgroups(s, subgroupsColumns2Details, children);
        });

        _.each(foods, function (f) {
            addFoods(f, foodsColumns2Details, children);
        });

        return {
            name: "Food",
            color: "#E8ECF2",
            children: children
        };

        function addGroups(group, details, result) {

            result.push({
                name: group[details["group_code_" + lang].index],
                size: group[details["value"].index],
                label: Formatter.format(group[details["value"].index]),
                color: colors.pop(),
                level : "1"
            });
        }

        function addSubgroups(subgroup, details, result) {

            var sub = {
                name: subgroup[details["subgroup_code_" + lang].index],
                size: subgroup[details["value"].index],
                label: Formatter.format(subgroup[details["value"].index]),
                color: "white",
                opacity: 0.3,
                level : "2"
            };

            var group = _.find(result, function (item) {
                return item.name === subgroup[details["group_code_" + lang].index];
            });

            if (!Array.isArray(group.children)) {
                group.children = [];
            }

            group.children.push(sub);
        }

        function addFoods(food, details, result) {

            var f = {
                name: food[details["foodex2_code_" + lang].index],
                size: food[details["value"].index],
                label: Formatter.format(food[details["value"].index]),
                level : "3"
            };

            var group = _.find(result, function (item) {
                return item.name === food[details["group_code_" + lang].index];
            });

            var subgroup = _.find(group.children, function (item) {
                return item.name === food[details["subgroup_code_" + lang].index];
            });

            if (!Array.isArray(subgroup.children)) {
                subgroup.children = [];
            }

            subgroup.children.push(f);
        }

        function getGroupColumnsDetails(raw) {

            var metadata = raw || {},
                dsd = metadata.dsd || {},
                columns = dsd.columns || [],
                result = {};

            _.each(columns, function (column, index) {

                result[column.id] = {
                    index: index
                }
            });

            return result;

        }


    };

    Bubble.prototype._buildBeveragesModel = function (raw) {

        var colors = RC["bubbleChartColors_" + this.type].slice(0) || [],
            lang = this.lang.toUpperCase(),
            data = raw || {},
            resourceSubgroups = data.food_subgroup || {},
            resourceFoods = data.food_food || {},
            metadataSudgroups = resourceSubgroups.metadata || {},
            metadataFoods = resourceFoods.metadata || {},
            subgroups = resourceSubgroups.data || [],
            foods = resourceFoods.data || [],
            subgroupsColumns2Details = getGroupColumnsDetails(metadataSudgroups),
            foodsColumns2Details = getGroupColumnsDetails(metadataFoods),
            children = [];


        _.each(subgroups, function (s) {
            addSubgroups(s, subgroupsColumns2Details, children);
        });

        _.each(foods, function (f) {
            addFoods(f, foodsColumns2Details, children);
        });

        return {
            name: "Beverages",
            color: "#213648",
            children: children
        };

        function addSubgroups(subgroup, details, result) {

            result.push({
                name: subgroup[details["subgroup_code_" + lang].index],
                size: subgroup[details["value"].index],
                color: colors.pop(),
                level : "1"
            });
        }

        function addFoods(food, details, result) {

            var f = {
                name: food[details["foodex2_code_" + lang].index],
                size: food[details["value"].index],
                color: colors.pop(),
                level : "2"
            };

            var subgroup = _.find(result, function (item) {
                return item.name === food[details["subgroup_code_" + lang].index];
            });

            if (!Array.isArray(subgroup.children)) {
                subgroup.children = [];
            }

            subgroup.children.push(f);
        }

        function getGroupColumnsDetails(raw) {

            var metadata = raw || {},
                dsd = metadata.dsd || {},
                columns = dsd.columns || [],
                result = {};

            _.each(columns, function (column, index) {

                result[column.id] = {
                    index: index
                }
            });

            return result;

        }

    };

    Bubble.prototype._render = function (data) {

        this.holderEl.removeClass("no-data");

        if (data.children.length === 0) {
            this.holderEl.addClass("no-data");
            return
        }

        var self = this,
            svg = d3.select(this.el),
            margin = 20,
            diameter = +svg.attr("width"),
            g = svg
                .append("g") //g element is used to group SVG shapes together
                .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")"); //center the g element

        //place element according to 'pack' layout
        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        //build model
        var root = d3.hierarchy(data)
            .sum(function (d) {
                return d.size || 0;
            })
            .sort(function (a, b) {
                return b.value - a.value;
            });

        this.focus = root;

        var descendants = pack(root).descendants(),
            view;

        // Define the div for the tooltip
        var tooltip = d3.select(this.el + "-holder")
            .append("div")
            .attr("class", "tooltip-bubble-chart")
            .style("opacity", 0);

        //create circles
        var circle = g.selectAll("circle")
            .data(descendants) //bind data with circle
            .enter() // create elements if there are not enough circle in g (originally empty)
            .append("circle")
            .attr("class", function (d) {
                return ("level-" + d.data.level + " ") + (d.parent ? (d.children ? "node" : "node node--leaf" ) : "node node--root");
            })
            .style("fill", function (d) {
                if (d.data && d.data.color) {
                    return d.data.color;
                }
            })
            .style("fill-opacity", function (d) {
                if (d.data && d.data.opacity) {
                    return d.data.opacity;
                }
            })
            .on("click", function (node) {
                d3.event.stopPropagation();

                var d = getRightNode(node);

                if (d) {
                    zoom(d);
                }
            })
            .on("mousemove", function (node) {

                var current = self.focus.data.name,
                    maxDepthAncestors = getMaxDepth(node).ancestors.reverse(),
                    path = _.map(maxDepthAncestors, function (i) {
                        return i.data.name
                    }),
                    currentIndex = path.indexOf(current),
                    d = maxDepthAncestors[currentIndex + 1];

                if (node.data.name === self.focus.data.name) {
                    return;
                }

                /*g.selectAll("circle")
                    .classed("no-pointer-event", true);

                g.selectAll("circle.level-" + (currentIndex + 1))
                    .classed("no-pointer-event", false);*/

                var size = getSize(d),
                    x = d3.event.pageX - $(self.el).offset().left,
                    y = d3.event.pageY - $(self.el).offset().top;

                //update tooltip content
                tooltip.html(tooltipTemplate({
                    size: Formatter.formatLabel(size),
                    um: "g",
                    title: d.data.name
                }))
                    .style("left", x + "px")
                    .style("top", y + "px");

                //show tooltip
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 1);
            })
            .on("mouseout", function (d) {

                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        //create texts
        /* var text = g.selectAll("text")
         .data(descendants)
         .enter()
         .append("text")
         .attr("class", "label")
         .style("fill-opacity", function (d) { //set if text should be visible or not
         return d.parent === root ? 1 : 0;
         })
         .style("display", function (d) {
         return d.parent === root ? "inline" : "none";
         })
         .text(function (d) {
         return d.data.name;
         });
         */
        //if background is clicked then zoom to background
        svg.style("background", "#FFFFFF")
            .on("click", function () {
                zoom(root);
            });

        //initial zoom to 'root'
        zoomTo([root.x, root.y, root.r * 2 + margin]);

        function zoom(d) {

            self.focus = d;

            var transition =
                svg.transition()
                    .duration(1000)
                    .tween("zoom", function (d) {
                        var i = d3.interpolateZoom(view, [self.focus.x, self.focus.y, self.focus.r * 2 + margin]);
                        return function (t) {
                            zoomTo(i(t));
                        };
                    });

            transition.selectAll("text")
                .filter(function (d) {
                    return d.parent === self.focus || this.style.display === "inline";
                })
                .style("fill-opacity", function (d) {
                    return d.parent === self.focus ? 1 : 0;
                })
                .on("start", function (d) {
                    if (d.parent === self.focus) this.style.display = "inline";
                })
                .on("end", function (d) {
                    if (d.parent !== self.focus) this.style.display = "none";
                });
        }

        function zoomTo(v) {
            var node = g.selectAll("circle,text");

            var k = diameter / v[2];
            view = v;

            node.attr("transform", function (d) {
                return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
            });
            circle.attr("r", function (d) {
                return d.r * k;
            });
        }

        function getRightNode(node) {

            var candidate = node.data.name,
                current = self.focus.data.name,
                maxDepthAncestors = getMaxDepth(node).ancestors.reverse(),
                path = _.map(maxDepthAncestors, function (i) {
                    return i.data.name
                }),
                currentIndex = path.indexOf(current),
                candidateIndex = path.indexOf(candidate);

            // step back
            if (currentIndex < 0) {
                return maxDepthAncestors[candidateIndex - 1];
            } else {

                //we are already there
                if (candidate === current) {
                    return maxDepthAncestors[current];
                }

                //is leaf
                if (candidateIndex < currentIndex) {
                    return maxDepthAncestors[currentIndex - 1];
                }

                //is leaf
                if (currentIndex + 2 === path.length) {
                    return maxDepthAncestors[current];
                }

                return maxDepthAncestors[currentIndex + 1];
            }
        }

        function getMaxDepth(startNode) {
            var ancestors = startNode.ancestors();
            var depth = 0;

            if (startNode.children) {
                startNode.children.forEach(function (child) {
                    var obj = getMaxDepth(child);
                    var maxDepthForCurrentTree = obj.depth;
                    if (maxDepthForCurrentTree > depth) {
                        depth = maxDepthForCurrentTree;
                        ancestors = obj.ancestors
                    }
                });
            }
            return {
                depth: depth + 1,
                ancestors: ancestors
            };
        }

        function getSize(node) {

            var size = (node.data && !isNaN(parseInt(node.data.size))) ? +node.data.size : 0;

            return size;
        }
    };

    Bubble.prototype.dispose = function () {
        d3.selectAll("svg > *").remove();
    };

    Bubble.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    Bubble.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return Bubble;

});