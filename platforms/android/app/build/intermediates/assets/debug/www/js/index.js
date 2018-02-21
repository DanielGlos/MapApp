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

function deg2rad(deg) {
    return deg * (Math.PI/180)
}


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
        var point1Lat, point1Lng, point2Lat, point2Lng;
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

                        if (point1Lat == null) {
                            point1Lat = JSON.stringify(results[0].position.lat);
                            point1Lng = JSON.stringify(results[0].position.lng);
                        }else {
                            point2Lat = JSON.stringify(results[0].position.lat);
                            point2Lng = JSON.stringify(results[0].position.lng);
                        }

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

        var btn_distance = document.getElementById('btn_distance');
        btn_distance.addEventListener("click", function(){
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(point2Lat-point1Lat);  // deg2rad below
            var dLon = deg2rad(point2Lng-point1Lng);
            var a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(point1Lat)) * Math.cos(deg2rad(point2Lat)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km
            alert("Distance between points is: " + d.toFixed(4) + " Km");
        });


        var btn_myLoc = document.getElementById('btn_myLoc');
        btn_myLoc.addEventListener("click", function() {
            map.getMyLocation(onSuccess, onError);
        });

        var btn_clear = document.getElementById('btn_clear');
        btn_clear.addEventListener('click', function(){
            map.clear();
            point1Lat = null;
        })
    }
};

app.initialize();