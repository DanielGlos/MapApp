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

function searchPlace()
{
    var address = document.getElementById('input_search').value;
    alert(address);

    // var geo = plugin.google.maps.Geocoder();
    // geo.geocode( { 'address': address}, function(results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         var latitude = results[0].geometry.location.lat();
    //         var longitude = results[0].geometry.location.lng();
    //         alert(latitude);
    //     }
    // });

    var div = document.getElementById("map_canvas1");
    var map = plugin.google.maps.Map.getMap(div);
    map.one(plugin.google.maps.event.MAP_READY, function() {
        console.log("--> map_canvas1 : ready.");
    });
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
        document.getElementById('btn_search').addEventListener('click', searchPlace);
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();