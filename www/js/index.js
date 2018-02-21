/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.prepareMap();
    },

    prepareMap: function () {
        var div = document.getElementById("map_canvas1");
        var map = plugin.google.maps.Map.getMap(div);
        map.addEventListener(plugin.google.maps.event.MAP_READY, function() {

            var isRunning = false;
            var inputField = document.getElementById('input_search')
            var btn_search = document.getElementById('btn_search');
            btn_search.addEventListener("click", function() {
                if (isRunning) {
                    return;
                }
                isRunning = true;

                // Address -> latitude,longitude
                plugin.google.maps.Geocoder.geocode({
                    "address": inputField.value
                }, function(results) {

                    if (results.length) {

                        var msg = ["latitude:" + JSON.stringify(results[0].position.lat),
                            "longitude:" + JSON.stringify(results[0].position.lng)].join("\n");

                        // Add a marker
                        map.addMarker({
                            'position': results[0].position,
                            'title':  msg
                        }, function(marker) {

                            // Move to the position
                            map.animateCamera({
                                'target': results[0].position,
                                'zoom': 17
                            }, function() {
                                marker.showInfoWindow();
                                isRunning = false;
                            });

                        });

                    } else {
                        isRunning = false;
                    }

                });
            });

        });

        var onSuccess = function(location) {
            var msg = ["latitude:" + location.latLng.lat,
                        "longitude:" + location.latLng.lng].join("\n");

            map.addMarker({
                'position': location.latLng,
                'title': msg
            }, function(marker) {
                marker.showInfoWindow();
                map.animateCamera({
                    target: location.latLng,
                    zoom: 16
                }, function() {
                    marker.showInfoWindow();
                });
            });
        };

        var onError = function(msg) {
            alert(JSON.stringify(msg));
        };


        var btn_myLoc = document.getElementById('btn_myLoc');
        btn_myLoc.addEventListener("click", function() {
            map.clear();
            map.getMyLocation(onSuccess, onError);
        });

        var btn_clear = document.getElementById('btn_clear');
        btn_clear.addEventListener('click', function(){
            map.clear();
            // point1Lat = null;
        })
    }
};

app.initialize();